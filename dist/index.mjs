var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/users/users.controller.ts
import { PrismaClient } from "@prisma/client";
var prisma, getAllUsers, getUserById, createUser, updateUser, deleteUser;
var init_users_controller = __esm({
  "src/users/users.controller.ts"() {
    "use strict";
    prisma = new PrismaClient();
    getAllUsers = async (req, res) => {
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
    getUserById = async (req, res) => {
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
    createUser = async (req, res) => {
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
    updateUser = async (req, res) => {
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
    deleteUser = async (req, res) => {
      try {
        const id = req.params.id;
        await prisma.users.delete({ where: { id } });
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  }
});

// src/users/users.route.ts
var users_route_exports = {};
__export(users_route_exports, {
  default: () => users_route_default
});
import { Router } from "express";
var router, users_route_default;
var init_users_route = __esm({
  "src/users/users.route.ts"() {
    "use strict";
    init_users_controller();
    router = Router();
    router.route("/").get(getAllUsers).post(createUser);
    router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
    users_route_default = router;
  }
});

// src/app.ts
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
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
app.use("/api/users", (init_users_route(), __toCommonJS(users_route_exports)).default);
var app_default = app;

// src/index.ts
var port = process.env.PORT || 8001;
app_default.listen(port, () => {
  console.log(`Server is running on port \u{1F449} ${port}`);
});
