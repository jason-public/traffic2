import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { getKnowledgeBaseReply } from './src/data/knowledgeBase';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API: AI 교통정책 및 노선 상담 도우미
app.post('/api/ai-chat', async (req, res) => {
  const { prompt, history } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: '유효한 질문 내용이 필요합니다.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  const systemContext = `
당신은 남양주시 대중교통과 공식 AI 정책 도우미입니다.
남양주시의 2025-2026 대중교통 현황 및 정책 데이터를 바탕으로 시민들과 행정 당사자들에게 친절하고 정확하며 안내하기 쉬운 한국어로만 답변합니다. 영어 번역이나 다른 언어 자동 번역을 제공하지 않으며 한국어 표준 답변만 전달합니다.

[남양주시 대중교통 주요 현황 데이터]
1. 수송분담률 (2025년 기준 총 907,382통행/일):
   - 승용차 60.08% (545,128건), 버스 27.26% (247,372건), 철도 8.35% (75,771건), 택시 4.31% (39,111건)
2. 버스 노선 및 대수:
   - 총 124개 노선 730대 (광역급행 5노선 49대, 직행좌석 23노선 180대, 일반시내 66노선 396대, 마을버스 30노선 105대)
3. 주요 광역/M버스 노선:
   - M버스(5개 노선 49대): M2341(화도), M2352(평내), M2353(다산), M2316(화도), M2323(호평) - 모두 잠실광역환승센터행, 대광위 준공영제 적용
   - 직행좌석: 진접(100, 105, 105-1, 2000, 2000-1, 11, 7007, 8012), 별내(1001), 다산(1003, 1006), 호평(1000, 1000-1), 화도(1100, 1200, 1200-1, 8001, 8002, 8002-1), 와부(1660, 1670, 1670-1, 1700)
4. 땡큐버스 & 트롤리버스:
   - 땡큐버스 16개 노선 130대, 트롤리버스 4개 노선 10대 (땡큐70, 땡큐90, 땡큐58-3, 58번 등)
5. 2층 버스:
   - 총 7개 노선 40대 도입 (디젤 36대, 전기 4대), 실운행 29대 (8002, 8012, M2323, M2352, 1670, 1001, 1003)
6. 1일 버스 이용객 (2026.6 기준):
   - 총 182,019명 (광역버스 19,071, 시내버스 132,361, 마을버스 30,587)
7. 저상버스:
   - 총 52개 노선 212대 (시내버스 158대[전기142, CNG16], 마을버스 54대[전기54])
8. 택시 및 쉼터:
   - 총 1,291대 (일반택시 342대/6개업체, 개인택시 949대/1개조합), 종사자 1,514명, 고요한택시 3대(청각장애인 운전원)
   - 남부택시쉼터(호평동 446㎡, 개인위탁), 북부택시쉼터(오남읍 340.85㎡, 법인위탁)
   - 택시 승차대 53개소 (포스트형 23, 쉘터형 30, 태양광 7)
9. 스마트 승강장:
   - 총 1,913개 승강장 중 스마트 승강장 43개소 (냉난방, 공기정화, 공공Wi-Fi, 버스정보안내기, 택시쉼터 포함)
10. 대중교통비 지원 3대 사업:
   - K-패스: 만 19세 이상, 월 15회 이상 사용 시 20~53% 환급 (청년/어르신 30%, 저소득 53%), 매월 계좌 환급
   - 어르신 교통비 지원: 만 65세 이상, 연 최대 12만원(분기별 3만원), 관내 농협 신청, 시비 100%
   - 어린이·청소년 교통비 지원: 만 6세~18세, 연 최대 24만원(분기별 6만원), 온라인 신청, 지역화폐(남양주사랑상품권) 환급

답변할 때는 구체적인 통계 수치와 친절한 단락 구분, 주요 키워드 강조(굵은 글씨)를 활용하세요.
`;

  try {
    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      const model = 'gemini-2.5-flash';

      const contents = [
        { role: 'user', parts: [{ text: systemContext }] },
        ...(history || []).slice(-10).map((h: { sender: string; text: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ];

      const response = await ai.models.generateContent({
        model,
        contents,
      });

      const responseText = response.text;
      if (responseText && responseText.trim()) {
        return res.json({ reply: responseText, source: 'ai' });
      }
    }
  } catch (err: any) {
    console.warn('Gemini API call failed, falling back to Knowledge Base:', err?.message || err);
  }

  // Fallback to Knowledge Base
  const reply = getKnowledgeBaseReply(prompt);
  return res.json({ reply, source: 'knowledge-base' });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Namyangju Public Transit Portal running on http://localhost:${PORT}`);
  });
}

startServer();
