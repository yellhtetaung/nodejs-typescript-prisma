"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
exports.default = (router) => {
    router.route("/users").get(users_1.getAllUsers).post(users_1.createUser);
    router
        .route("/users/:id")
        .get(users_1.getUserById)
        .put(users_1.updateUser)
        .delete(users_1.deleteUser);
};
//# sourceMappingURL=users.js.map