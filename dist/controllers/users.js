"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.users.findMany();
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield prisma.users.findUnique({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role, image } = req.body;
        const existingUser = yield prisma.users.findUnique({
            where: {
                username,
                email,
            },
        });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const newUser = yield prisma.users.create({
            data: {
                username,
                email,
                password,
                role,
                image,
            },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { username, email, password, role } = req.body;
        const user = yield prisma.users.update({
            where: { id: id },
            data: {
                username,
                email,
                password,
                role,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield prisma.users.delete({ where: { id } });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map