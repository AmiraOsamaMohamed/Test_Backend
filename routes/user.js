const { uuid } = require('uuidv4');
const user = require("express").Router();
const conn = require("../db/connection");
import express from "express";

import {
    signUp,
    logIn,
} from "../controllers/userController.js";

const router = express.Router();
router.route("/").post(signUp);
router.route("/:email,password").get(logIn);

export default router;
