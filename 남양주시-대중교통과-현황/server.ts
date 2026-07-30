import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

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
남양주시의 2025-2026 대중교통 현황 및 정책 데이터를 바탕으로 시민들과 행정 당사자들에게 친절하고 정확하며 안내하기 쉬운 한국어로 답변합니다.

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
      const model = 'gemini-3.6-flash';

      const contents = [
        { role: 'user', parts: [{ text: systemContext }] },
        ...(history || []).map((h: { sender: string; text: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ];

      const response = await ai.models.generateContent({
        model,
        contents,
      });

      const responseText = response.text || '죄송합니다. 답변을 생성하지 못했습니다.';
      return res.json({ reply: responseText });
    } else {
      // Fallback smart rule response if API Key is not configured in process.env
      let reply = '';
      const p = prompt.toLowerCase();

      if (p.includes('어르신') || p.includes('노인') || p.includes('65세')) {
        reply = `**[남양주시 어르신 대중교통비 지원 안내]**\n\n- **지원 대상**: 만 65세 이상 남양주시 주민\n- **지원 금액**: 연 최대 12만원 (분기당 3만원)\n- **신청 방법**: 관내 농협(농협은행 및 축협 등) 방문 신청\n- **지급 방식**: 분기별 실사용 실적 확인 후 현금 계좌 환급\n- **2026년 예산**: 시비 100% (총 51.2억원 집행중)`;
      } else if (p.includes('k패스') || p.includes('k-패스') || p.includes('kpass')) {
        reply = `**[K-패스 대중교통비 지원 안내]**\n\n- **지원 대상**: 만 19세 이상 모든 주민\n- **지원 내용**: 월 15회 이상 대중교통 이용 시 환급\n- **환급 비율**: 일반 20%, 청년/어르신 30%, 저소득층 53% (월 평균 환급액 약 44,655원)\n- **신청 방법**: 취급 카드사 앱 또는 홈페이지에서 K-패스 카드 발급/등록\n- **적용 범위**: 전국 모든 버스, 지하철 (고속·시외버스, KTX 제외)`;
      } else if (p.includes('청소년') || p.includes('어린이')) {
        reply = `**[어린이·청소년 대중교통비 지원 안내]**\n\n- **지원 대상**: 만 6세 ~ 만 18세 어린이 및 청소년\n- **지원 금액**: 연 최대 24만원 (분기당 6만원)\n- **신청 방법**: 경기도 어린이청소년 교통비 지원 포털 온라인 신청\n- **지급 방식**: 남양주사랑상품권(지역화폐) 환급`;
      } else if (p.includes('m버스') || p.includes('광역급행')) {
        reply = `**[남양주시 M버스(광역급행) 운행 현황]**\n\n남양주시에는 총 **5개 노선 49대**의 M버스가 운행 중이며, 전 노선 대광위 준공영제가 적용됩니다:\n1. **M2341**: 화도월산부영 ↔ 잠실광역환승센터 (6대)\n2. **M2352**: 평내동 ↔ 잠실광역환승센터 (10대)\n3. **M2353**: 다산진건지구 ↔ 잠실광역환승센터 (10대)\n4. **M2316**: 화도영남아파트 ↔ 잠실광역환승센터 (10대)\n5. **M2323**: 호평동 ↔ 잠실광역환승센터 (13대)`;
      } else if (p.includes('땡큐') || p.includes('트롤리')) {
        reply = `**[땡큐버스 및 트롤리버스 현황]**\n\n- **땡큐버스**: 남양주시 전역 16개 노선 **130대** 운행 중\n- **트롤리버스**: 유럽형 레트로 디자인 4개 노선 **10대** 운행 중 (땡큐70, 땡큐90, 땡큐58-3, 58번 노선 각 배치)`;
      } else if (p.includes('스마트') || p.includes('승강장') || p.includes('정류장')) {
        reply = `**[남양주시 스마트 승강장 현황]**\n\n- **전체 정류장**: 총 1,913개소 (쉘터형 1,053, 독립형 39, 표지판 521, 무표지형 257, 스마트 승강장 43)\n- **주요 스마트 승강장 위치**: 평내호평역(①,②,③), 호평이마트, 다산선형공원, 오남역, 마석역, 사능역 등 관내 43개소\n- **편의 시설**: 냉난방 시설, 공기청정기, 버스도착안내기(BIT), 공공 Wi-Fi, 휴대폰 충전기, UV 살균기`;
      } else {
        reply = `남양주시 대중교통 및 정책 현황 질문에 감사드립니다!\n\n**주요 안내 가능 분야:**\n1. **교통비 지원 정책**: K-패스, 어르신 교통비, 어린이·청소년 교통비 환급 안내\n2. **버스 운행 노선**: M버스(5개 노선), 직행좌석(23개 노선), 땡큐버스(16개 노선), 2층버스, 공항버스\n3. **택시 및 승차대**: 일반/개인택시, 고요한택시, 남부/북부 택시쉼터, 택시승차대 53개소\n4. **스마트 승강장**: 관내 43개 스마트 승강장 위치 및 편의시설\n\n구체적인 궁금한 점을 질문해 주세요!`;
      }

      return res.json({ reply });
    }
  } catch (err: any) {
    console.error('AI Chat endpoint error:', err);
    return res.status(500).json({ error: 'AI 응답 중 오류가 발생했습니다.', details: err?.message });
  }
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
