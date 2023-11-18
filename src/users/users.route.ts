import { Router } from "express";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "./users.controller";

const router = Router();

router.route("/users").get(getAllUsers).post(createUser);
router.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
