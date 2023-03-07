"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const state_controllers_1 = require("../controllers/state.controllers");
const jwt_1 = require("../middlewares/jwt");
const router = (0, express_1.Router)();
router.get('/getall', state_controllers_1.getState);
router.get('/getone/:id', state_controllers_1.getOneState);
router.use(jwt_1.authMiddleware);
router.post('/create', state_controllers_1.createState);
router.put('/update:id', state_controllers_1.updateState);
router.delete('/delete/:id', state_controllers_1.deleteState);
exports.default = router;
