"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controllers_1 = require("../controllers/profile.controllers");
const router = (0, express_1.Router)();
router.post('/create', profile_controllers_1.createProfile);
/* router.use(authMiddleware) */
router.get('/getall', profile_controllers_1.getProfiles);
router.get('/getone/:id', profile_controllers_1.getOneProfile);
router.put('/update/:id', profile_controllers_1.updateProfile);
router.delete('/delete/:id', profile_controllers_1.deleteProfile);
exports.default = router;
