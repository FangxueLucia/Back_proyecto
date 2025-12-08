import express from "express";
import dotenv from "dotenv";


dotenv.config();

const router = express.Router();
// router.use(authMiddleware);

router.post("/verify", (req,res)=>{
    res.status(200).send("ok");
});

export default router;
