import express from "express";
import {
  loginService,
  registerService,
  generateCodeService,
  checkCodeService,
  resetPasswordService,
} from "../Services/sign.service.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, username, password } = req.body;
  const result = await registerService(name, email, username, password);
  res.status(result.status).send(result.message);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await loginService(username, password);
  res.status(result.status).send(result.message);
});

router.post("/code-check", async (req, res) => {
  console.log(req.body);
  const { checkCode, email } = req.body;
  console.log(checkCode);
  const result = await checkCodeService(checkCode, email);
  res.status(result.status).send(result.message);
});

router.post("/get-email", async (req, res) => {
  console.log("hola");
  const { email } = req.body;
  const result = await generateCodeService(email);
  res.status(result.status).send(result.message);
});

router.post("/reset-password", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const result = await resetPasswordService(email, password);
  res.status(result.status).send(result.message);
});

export default router;
