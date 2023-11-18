"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routers/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.get("/", (req, res) => {
    res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Node & TypeScript</title>
      </head>
      <body>
        <h1>Node & TypeScript🚀</h1>
      </body>
    </html>
  `);
});
app.use("/api", (0, index_1.default)());
app.listen(port, () => console.log(`Server is listening on port 👉 ${port}`));
exports.default = app;
//# sourceMappingURL=index.js.map