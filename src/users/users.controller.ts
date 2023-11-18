import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Users } from "../types/users.types";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.users.findMany();

		if (users.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json(users);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const id: string = req.params.id;

		const user = await prisma.users.findUnique({ where: { id } });

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json(user);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const { username, email, password, role, image } = req.body as Users;

		const existingUser = await prisma.users.findUnique({
			where: {
				username,
				email,
			},
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
				image,
			},
		});

		res.status(201).json(newUser);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const id: string = req.params.id;
		const { username, email, password, role }: Users = req.body;

		const user = await prisma.users.update({
			where: { id: id },
			data: {
				username,
				email,
				password,
				role,
			},
		});

		res.status(200).json(user);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const id: string = req.params.id;

		await prisma.users.delete({ where: { id } });

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
