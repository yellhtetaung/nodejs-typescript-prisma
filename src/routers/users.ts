import { Router } from "express";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../controllers/users";

export default (router: Router) => {
	router.route("/users").get(getAllUsers).post(createUser);
	router
		.route("/users/:id")
		.get(getUserById)
		.put(updateUser)
		.delete(deleteUser);
};
