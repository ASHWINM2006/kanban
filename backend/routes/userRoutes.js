const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");

router.post("/signup", createUser);


router.get("/", getUsers);

module.exports = router;
