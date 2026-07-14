import express from "express";

import * as userController from "../controllers/user.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import { authorize } from "../middleware/role.middleware.js";


const router = express.Router();

router.use(authenticate);

router.use(authorize("ADMIN"));

router.get("/",userController.getUsers);

router.get("/:id",userController.getUser);

router.post("/",userController.createUser);

router.put("/:id",userController.updateUser);

router.delete("/:id",userController.deleteUser);

export default router;