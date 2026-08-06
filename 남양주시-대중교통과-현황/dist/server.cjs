var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
app.post("/api/ai-chat", async (req, res) => {
  const { prompt, history } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "\uC720\uD6A8\uD55C \uC9C8\uBB38 \uB0B4\uC6A9\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  const systemContext = `
\uB2F9\uC2E0\uC740 \uB0A8\uC591\uC8FC\uC2DC \uB300\uC911\uAD50\uD1B5\uACFC \uACF5\uC2DD AI \uC815\uCC45 \uB3C4\uC6B0\uBBF8\uC785\uB2C8\uB2E4.
\uB0A8\uC591\uC8FC\uC2DC\uC758 2025-2026 \uB300\uC911\uAD50\uD1B5 \uD604\uD669 \uBC0F \uC815\uCC45 \uB370\uC774\uD130\uB97C \uBC14\uD0D5\uC73C\uB85C \uC2DC\uBBFC\uB4E4\uACFC \uD589\uC815 \uB2F9\uC0AC\uC790\uB4E4\uC5D0\uAC8C \uCE5C\uC808\uD558\uACE0 \uC815\uD655\uD558\uBA70 \uC548\uB0B4\uD558\uAE30 \uC26C\uC6B4 \uD55C\uAD6D\uC5B4\uB85C \uB2F5\uBCC0\uD569\uB2C8\uB2E4.

[\uB0A8\uC591\uC8FC\uC2DC \uB300\uC911\uAD50\uD1B5 \uC8FC\uC694 \uD604\uD669 \uB370\uC774\uD130]
1. \uC218\uC1A1\uBD84\uB2F4\uB960 (2025\uB144 \uAE30\uC900 \uCD1D 907,382\uD1B5\uD589/\uC77C):
   - \uC2B9\uC6A9\uCC28 60.08% (545,128\uAC74), \uBC84\uC2A4 27.26% (247,372\uAC74), \uCCA0\uB3C4 8.35% (75,771\uAC74), \uD0DD\uC2DC 4.31% (39,111\uAC74)
2. \uBC84\uC2A4 \uB178\uC120 \uBC0F \uB300\uC218:
   - \uCD1D 124\uAC1C \uB178\uC120 730\uB300 (\uAD11\uC5ED\uAE09\uD589 5\uB178\uC120 49\uB300, \uC9C1\uD589\uC88C\uC11D 23\uB178\uC120 180\uB300, \uC77C\uBC18\uC2DC\uB0B4 66\uB178\uC120 396\uB300, \uB9C8\uC744\uBC84\uC2A4 30\uB178\uC120 105\uB300)
3. \uC8FC\uC694 \uAD11\uC5ED/M\uBC84\uC2A4 \uB178\uC120:
   - M\uBC84\uC2A4(5\uAC1C \uB178\uC120 49\uB300): M2341(\uD654\uB3C4), M2352(\uD3C9\uB0B4), M2353(\uB2E4\uC0B0), M2316(\uD654\uB3C4), M2323(\uD638\uD3C9) - \uBAA8\uB450 \uC7A0\uC2E4\uAD11\uC5ED\uD658\uC2B9\uC13C\uD130\uD589, \uB300\uAD11\uC704 \uC900\uACF5\uC601\uC81C \uC801\uC6A9
   - \uC9C1\uD589\uC88C\uC11D: \uC9C4\uC811(100, 105, 105-1, 2000, 2000-1, 11, 7007, 8012), \uBCC4\uB0B4(1001), \uB2E4\uC0B0(1003, 1006), \uD638\uD3C9(1000, 1000-1), \uD654\uB3C4(1100, 1200, 1200-1, 8001, 8002, 8002-1), \uC640\uBD80(1660, 1670, 1670-1, 1700)
4. \uB561\uD050\uBC84\uC2A4 & \uD2B8\uB864\uB9AC\uBC84\uC2A4:
   - \uB561\uD050\uBC84\uC2A4 16\uAC1C \uB178\uC120 130\uB300, \uD2B8\uB864\uB9AC\uBC84\uC2A4 4\uAC1C \uB178\uC120 10\uB300 (\uB561\uD05070, \uB561\uD05090, \uB561\uD05058-3, 58\uBC88 \uB4F1)
5. 2\uCE35 \uBC84\uC2A4:
   - \uCD1D 7\uAC1C \uB178\uC120 40\uB300 \uB3C4\uC785 (\uB514\uC824 36\uB300, \uC804\uAE30 4\uB300), \uC2E4\uC6B4\uD589 29\uB300 (8002, 8012, M2323, M2352, 1670, 1001, 1003)
6. 1\uC77C \uBC84\uC2A4 \uC774\uC6A9\uAC1D (2026.6 \uAE30\uC900):
   - \uCD1D 182,019\uBA85 (\uAD11\uC5ED\uBC84\uC2A4 19,071, \uC2DC\uB0B4\uBC84\uC2A4 132,361, \uB9C8\uC744\uBC84\uC2A4 30,587)
7. \uC800\uC0C1\uBC84\uC2A4:
   - \uCD1D 52\uAC1C \uB178\uC120 212\uB300 (\uC2DC\uB0B4\uBC84\uC2A4 158\uB300[\uC804\uAE30142, CNG16], \uB9C8\uC744\uBC84\uC2A4 54\uB300[\uC804\uAE3054])
8. \uD0DD\uC2DC \uBC0F \uC27C\uD130:
   - \uCD1D 1,291\uB300 (\uC77C\uBC18\uD0DD\uC2DC 342\uB300/6\uAC1C\uC5C5\uCCB4, \uAC1C\uC778\uD0DD\uC2DC 949\uB300/1\uAC1C\uC870\uD569), \uC885\uC0AC\uC790 1,514\uBA85, \uACE0\uC694\uD55C\uD0DD\uC2DC 3\uB300(\uCCAD\uAC01\uC7A5\uC560\uC778 \uC6B4\uC804\uC6D0)
   - \uB0A8\uBD80\uD0DD\uC2DC\uC27C\uD130(\uD638\uD3C9\uB3D9 446\u33A1, \uAC1C\uC778\uC704\uD0C1), \uBD81\uBD80\uD0DD\uC2DC\uC27C\uD130(\uC624\uB0A8\uC74D 340.85\u33A1, \uBC95\uC778\uC704\uD0C1)
   - \uD0DD\uC2DC \uC2B9\uCC28\uB300 53\uAC1C\uC18C (\uD3EC\uC2A4\uD2B8\uD615 23, \uC258\uD130\uD615 30, \uD0DC\uC591\uAD11 7)
9. \uC2A4\uB9C8\uD2B8 \uC2B9\uAC15\uC7A5:
   - \uCD1D 1,913\uAC1C \uC2B9\uAC15\uC7A5 \uC911 \uC2A4\uB9C8\uD2B8 \uC2B9\uAC15\uC7A5 43\uAC1C\uC18C (\uB0C9\uB09C\uBC29, \uACF5\uAE30\uC815\uD654, \uACF5\uACF5Wi-Fi, \uBC84\uC2A4\uC815\uBCF4\uC548\uB0B4\uAE30, \uD0DD\uC2DC\uC27C\uD130 \uD3EC\uD568)
10. \uB300\uC911\uAD50\uD1B5\uBE44 \uC9C0\uC6D0 3\uB300 \uC0AC\uC5C5:
   - K-\uD328\uC2A4: \uB9CC 19\uC138 \uC774\uC0C1, \uC6D4 15\uD68C \uC774\uC0C1 \uC0AC\uC6A9 \uC2DC 20~53% \uD658\uAE09 (\uCCAD\uB144/\uC5B4\uB974\uC2E0 30%, \uC800\uC18C\uB4DD 53%), \uB9E4\uC6D4 \uACC4\uC88C \uD658\uAE09
   - \uC5B4\uB974\uC2E0 \uAD50\uD1B5\uBE44 \uC9C0\uC6D0: \uB9CC 65\uC138 \uC774\uC0C1, \uC5F0 \uCD5C\uB300 12\uB9CC\uC6D0(\uBD84\uAE30\uBCC4 3\uB9CC\uC6D0), \uAD00\uB0B4 \uB18D\uD611 \uC2E0\uCCAD, \uC2DC\uBE44 100%
   - \uC5B4\uB9B0\uC774\xB7\uCCAD\uC18C\uB144 \uAD50\uD1B5\uBE44 \uC9C0\uC6D0: \uB9CC 6\uC138~18\uC138, \uC5F0 \uCD5C\uB300 24\uB9CC\uC6D0(\uBD84\uAE30\uBCC4 6\uB9CC\uC6D0), \uC628\uB77C\uC778 \uC2E0\uCCAD, \uC9C0\uC5ED\uD654\uD3D0(\uB0A8\uC591\uC8FC\uC0AC\uB791\uC0C1\uD488\uAD8C) \uD658\uAE09

\uB2F5\uBCC0\uD560 \uB54C\uB294 \uAD6C\uCCB4\uC801\uC778 \uD1B5\uACC4 \uC218\uCE58\uC640 \uCE5C\uC808\uD55C \uB2E8\uB77D \uAD6C\uBD84, \uC8FC\uC694 \uD0A4\uC6CC\uB4DC \uAC15\uC870(\uAD75\uC740 \uAE00\uC528)\uB97C \uD65C\uC6A9\uD558\uC138\uC694.
`;
  try {
    if (apiKey) {
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const model = "gemini-3.6-flash";
      const contents = [
        { role: "user", parts: [{ text: systemContext }] },
        ...(history || []).map((h) => ({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        })),
        { role: "user", parts: [{ text: prompt }] }
      ];
      const response = await ai.models.generateContent({
        model,
        contents
      });
      const responseText = response.text || "\uC8C4\uC1A1\uD569\uB2C8\uB2E4. \uB2F5\uBCC0\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
      return res.json({ reply: responseText });
    } else {
      let reply = "";
      const p = prompt.toLowerCase();
      if (p.includes("\uC5B4\uB974\uC2E0") || p.includes("\uB178\uC778") || p.includes("65\uC138")) {
        reply = `**[\uB0A8\uC591\uC8FC\uC2DC \uC5B4\uB974\uC2E0 \uB300\uC911\uAD50\uD1B5\uBE44 \uC9C0\uC6D0 \uC548\uB0B4]**

- **\uC9C0\uC6D0 \uB300\uC0C1**: \uB9CC 65\uC138 \uC774\uC0C1 \uB0A8\uC591\uC8FC\uC2DC \uC8FC\uBBFC
- **\uC9C0\uC6D0 \uAE08\uC561**: \uC5F0 \uCD5C\uB300 12\uB9CC\uC6D0 (\uBD84\uAE30\uB2F9 3\uB9CC\uC6D0)
- **\uC2E0\uCCAD \uBC29\uBC95**: \uAD00\uB0B4 \uB18D\uD611(\uB18D\uD611\uC740\uD589 \uBC0F \uCD95\uD611 \uB4F1) \uBC29\uBB38 \uC2E0\uCCAD
- **\uC9C0\uAE09 \uBC29\uC2DD**: \uBD84\uAE30\uBCC4 \uC2E4\uC0AC\uC6A9 \uC2E4\uC801 \uD655\uC778 \uD6C4 \uD604\uAE08 \uACC4\uC88C \uD658\uAE09
- **2026\uB144 \uC608\uC0B0**: \uC2DC\uBE44 100% (\uCD1D 51.2\uC5B5\uC6D0 \uC9D1\uD589\uC911)`;
      } else if (p.includes("k\uD328\uC2A4") || p.includes("k-\uD328\uC2A4") || p.includes("kpass")) {
        reply = `**[K-\uD328\uC2A4 \uB300\uC911\uAD50\uD1B5\uBE44 \uC9C0\uC6D0 \uC548\uB0B4]**

- **\uC9C0\uC6D0 \uB300\uC0C1**: \uB9CC 19\uC138 \uC774\uC0C1 \uBAA8\uB4E0 \uC8FC\uBBFC
- **\uC9C0\uC6D0 \uB0B4\uC6A9**: \uC6D4 15\uD68C \uC774\uC0C1 \uB300\uC911\uAD50\uD1B5 \uC774\uC6A9 \uC2DC \uD658\uAE09
- **\uD658\uAE09 \uBE44\uC728**: \uC77C\uBC18 20%, \uCCAD\uB144/\uC5B4\uB974\uC2E0 30%, \uC800\uC18C\uB4DD\uCE35 53% (\uC6D4 \uD3C9\uADE0 \uD658\uAE09\uC561 \uC57D 44,655\uC6D0)
- **\uC2E0\uCCAD \uBC29\uBC95**: \uCDE8\uAE09 \uCE74\uB4DC\uC0AC \uC571 \uB610\uB294 \uD648\uD398\uC774\uC9C0\uC5D0\uC11C K-\uD328\uC2A4 \uCE74\uB4DC \uBC1C\uAE09/\uB4F1\uB85D
- **\uC801\uC6A9 \uBC94\uC704**: \uC804\uAD6D \uBAA8\uB4E0 \uBC84\uC2A4, \uC9C0\uD558\uCCA0 (\uACE0\uC18D\xB7\uC2DC\uC678\uBC84\uC2A4, KTX \uC81C\uC678)`;
      } else if (p.includes("\uCCAD\uC18C\uB144") || p.includes("\uC5B4\uB9B0\uC774")) {
        reply = `**[\uC5B4\uB9B0\uC774\xB7\uCCAD\uC18C\uB144 \uB300\uC911\uAD50\uD1B5\uBE44 \uC9C0\uC6D0 \uC548\uB0B4]**

- **\uC9C0\uC6D0 \uB300\uC0C1**: \uB9CC 6\uC138 ~ \uB9CC 18\uC138 \uC5B4\uB9B0\uC774 \uBC0F \uCCAD\uC18C\uB144
- **\uC9C0\uC6D0 \uAE08\uC561**: \uC5F0 \uCD5C\uB300 24\uB9CC\uC6D0 (\uBD84\uAE30\uB2F9 6\uB9CC\uC6D0)
- **\uC2E0\uCCAD \uBC29\uBC95**: \uACBD\uAE30\uB3C4 \uC5B4\uB9B0\uC774\uCCAD\uC18C\uB144 \uAD50\uD1B5\uBE44 \uC9C0\uC6D0 \uD3EC\uD138 \uC628\uB77C\uC778 \uC2E0\uCCAD
- **\uC9C0\uAE09 \uBC29\uC2DD**: \uB0A8\uC591\uC8FC\uC0AC\uB791\uC0C1\uD488\uAD8C(\uC9C0\uC5ED\uD654\uD3D0) \uD658\uAE09`;
      } else if (p.includes("m\uBC84\uC2A4") || p.includes("\uAD11\uC5ED\uAE09\uD589")) {
        reply = `**[\uB0A8\uC591\uC8FC\uC2DC M\uBC84\uC2A4(\uAD11\uC5ED\uAE09\uD589) \uC6B4\uD589 \uD604\uD669]**

\uB0A8\uC591\uC8FC\uC2DC\uC5D0\uB294 \uCD1D **5\uAC1C \uB178\uC120 49\uB300**\uC758 M\uBC84\uC2A4\uAC00 \uC6B4\uD589 \uC911\uC774\uBA70, \uC804 \uB178\uC120 \uB300\uAD11\uC704 \uC900\uACF5\uC601\uC81C\uAC00 \uC801\uC6A9\uB429\uB2C8\uB2E4:
1. **M2341**: \uD654\uB3C4\uC6D4\uC0B0\uBD80\uC601 \u2194 \uC7A0\uC2E4\uAD11\uC5ED\uD658\uC2B9\uC13C\uD130 (6\uB300)
2. **M2352**: \uD3C9\uB0B4\uB3D9 \u2194 \uC7A0\uC2E4\uAD11\uC5ED\uD658\uC2B9\uC13C\uD130 (10\uB300)
3. **M2353**: \uB2E4\uC0B0\uC9C4\uAC74\uC9C0\uAD6C \u2194 \uC7A0\uC2E4\uAD11\uC5ED\uD658\uC2B9\uC13C\uD130 (10\uB300)
4. **M2316**: \uD654\uB3C4\uC601\uB0A8\uC544\uD30C\uD2B8 \u2194 \uC7A0\uC2E4\uAD11\uC5ED\uD658\uC2B9\uC13C\uD130 (10\uB300)
5. **M2323**: \uD638\uD3C9\uB3D9 \u2194 \uC7A0\uC2E4\uAD11\uC5ED\uD658\uC2B9\uC13C\uD130 (13\uB300)`;
      } else if (p.includes("\uB561\uD050") || p.includes("\uD2B8\uB864\uB9AC")) {
        reply = `**[\uB561\uD050\uBC84\uC2A4 \uBC0F \uD2B8\uB864\uB9AC\uBC84\uC2A4 \uD604\uD669]**

- **\uB561\uD050\uBC84\uC2A4**: \uB0A8\uC591\uC8FC\uC2DC \uC804\uC5ED 16\uAC1C \uB178\uC120 **130\uB300** \uC6B4\uD589 \uC911
- **\uD2B8\uB864\uB9AC\uBC84\uC2A4**: \uC720\uB7FD\uD615 \uB808\uD2B8\uB85C \uB514\uC790\uC778 4\uAC1C \uB178\uC120 **10\uB300** \uC6B4\uD589 \uC911 (\uB561\uD05070, \uB561\uD05090, \uB561\uD05058-3, 58\uBC88 \uB178\uC120 \uAC01 \uBC30\uCE58)`;
      } else if (p.includes("\uC2A4\uB9C8\uD2B8") || p.includes("\uC2B9\uAC15\uC7A5") || p.includes("\uC815\uB958\uC7A5")) {
        reply = `**[\uB0A8\uC591\uC8FC\uC2DC \uC2A4\uB9C8\uD2B8 \uC2B9\uAC15\uC7A5 \uD604\uD669]**

- **\uC804\uCCB4 \uC815\uB958\uC7A5**: \uCD1D 1,913\uAC1C\uC18C (\uC258\uD130\uD615 1,053, \uB3C5\uB9BD\uD615 39, \uD45C\uC9C0\uD310 521, \uBB34\uD45C\uC9C0\uD615 257, \uC2A4\uB9C8\uD2B8 \uC2B9\uAC15\uC7A5 43)
- **\uC8FC\uC694 \uC2A4\uB9C8\uD2B8 \uC2B9\uAC15\uC7A5 \uC704\uCE58**: \uD3C9\uB0B4\uD638\uD3C9\uC5ED(\u2460,\u2461,\u2462), \uD638\uD3C9\uC774\uB9C8\uD2B8, \uB2E4\uC0B0\uC120\uD615\uACF5\uC6D0, \uC624\uB0A8\uC5ED, \uB9C8\uC11D\uC5ED, \uC0AC\uB2A5\uC5ED \uB4F1 \uAD00\uB0B4 43\uAC1C\uC18C
- **\uD3B8\uC758 \uC2DC\uC124**: \uB0C9\uB09C\uBC29 \uC2DC\uC124, \uACF5\uAE30\uCCAD\uC815\uAE30, \uBC84\uC2A4\uB3C4\uCC29\uC548\uB0B4\uAE30(BIT), \uACF5\uACF5 Wi-Fi, \uD734\uB300\uD3F0 \uCDA9\uC804\uAE30, UV \uC0B4\uADE0\uAE30`;
      } else {
        reply = `\uB0A8\uC591\uC8FC\uC2DC \uB300\uC911\uAD50\uD1B5 \uBC0F \uC815\uCC45 \uD604\uD669 \uC9C8\uBB38\uC5D0 \uAC10\uC0AC\uB4DC\uB9BD\uB2C8\uB2E4!

**\uC8FC\uC694 \uC548\uB0B4 \uAC00\uB2A5 \uBD84\uC57C:**
1. **\uAD50\uD1B5\uBE44 \uC9C0\uC6D0 \uC815\uCC45**: K-\uD328\uC2A4, \uC5B4\uB974\uC2E0 \uAD50\uD1B5\uBE44, \uC5B4\uB9B0\uC774\xB7\uCCAD\uC18C\uB144 \uAD50\uD1B5\uBE44 \uD658\uAE09 \uC548\uB0B4
2. **\uBC84\uC2A4 \uC6B4\uD589 \uB178\uC120**: M\uBC84\uC2A4(5\uAC1C \uB178\uC120), \uC9C1\uD589\uC88C\uC11D(23\uAC1C \uB178\uC120), \uB561\uD050\uBC84\uC2A4(16\uAC1C \uB178\uC120), 2\uCE35\uBC84\uC2A4, \uACF5\uD56D\uBC84\uC2A4
3. **\uD0DD\uC2DC \uBC0F \uC2B9\uCC28\uB300**: \uC77C\uBC18/\uAC1C\uC778\uD0DD\uC2DC, \uACE0\uC694\uD55C\uD0DD\uC2DC, \uB0A8\uBD80/\uBD81\uBD80 \uD0DD\uC2DC\uC27C\uD130, \uD0DD\uC2DC\uC2B9\uCC28\uB300 53\uAC1C\uC18C
4. **\uC2A4\uB9C8\uD2B8 \uC2B9\uAC15\uC7A5**: \uAD00\uB0B4 43\uAC1C \uC2A4\uB9C8\uD2B8 \uC2B9\uAC15\uC7A5 \uC704\uCE58 \uBC0F \uD3B8\uC758\uC2DC\uC124

\uAD6C\uCCB4\uC801\uC778 \uAD81\uAE08\uD55C \uC810\uC744 \uC9C8\uBB38\uD574 \uC8FC\uC138\uC694!`;
      }
      return res.json({ reply });
    }
  } catch (err) {
    console.error("AI Chat endpoint error:", err);
    return res.status(500).json({ error: "AI \uC751\uB2F5 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.", details: err?.message });
  }
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Namyangju Public Transit Portal running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
