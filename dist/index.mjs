// src/index.ts
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

// src/routers/index.ts
import { Router } from "express";

// src/controllers/users.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient();
var getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
var getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createUser = async (req, res) => {
  try {
    const { username, email, password, role, image } = req.body;
    const existingUser = await prisma.users.findUnique({
      where: {
        username,
        email
      }
    });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password,
        role,
        image
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, password, role } = req.body;
    const user = await prisma.users.update({
      where: { id },
      data: {
        username,
        email,
        password,
        role
      }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.users.delete({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// src/routers/users.ts
var users_default = (router2) => {
  router2.route("/users").get(getAllUsers).post(createUser);
  router2.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);
};

// src/routers/index.ts
var router = Router();
var routers_default = () => {
  users_default(router);
  return router;
};

// src/index.ts
dotenv.config();
var app = express();
var port = process.env.PORT || 8001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true
  })
);
app.get("/", (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Node & TypeScript</title>
      </head>
      <body>
        <h1>Node & TypeScript\u{1F680}</h1>
      </body>
    </html>
  `);
});
app.use("/api", routers_default());
app.listen(port, () => console.log(`Server is listening on port \u{1F449} ${port}`));
var src_default = app;
export {
  src_default as default
};
