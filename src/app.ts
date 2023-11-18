import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
	})
);

app.get("/", (req: express.Request, res: express.Response) => {
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

app.use("/api", require("./users/users.router").default);

export default app;
