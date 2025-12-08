import express from "express";
import {loginService, registerService} from "../Services/sign.service.js";

const router = express.Router();

router.post("/register", async(req,res)=>{
    const {username, password} = req.body;
    const result = await registerService(username, password);
    res.status(result.status).send(result.message);
});

router.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    const result = await loginService(username, password);
    res.status(result.status).send(result.message);
});


export default router;
