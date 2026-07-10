const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

const ctrl = new userController();

router.post("/register", ctrl.create);
router.post("/login", ctrl.login);
router.patch("/update", ctrl.update);

module.exports = router;
