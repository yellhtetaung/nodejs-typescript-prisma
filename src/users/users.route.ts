import { Router } from "express";
import {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	getSingleUser,
} from "./users.controller";

const router = Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.route("/search").get(getSingleUser);

export default router;
