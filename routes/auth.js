import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req,res)=>{
  const {name,email,password} = req.body;
  const hash = await bcrypt.hash(password,10);

  const user = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email",
    [name,email,hash]
  );

  res.json(user.rows[0]);
});

router.post("/login", async (req,res)=>{
  const {email,password} = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);

  if(user.rows.length === 0)
    return res.status(400).json("User not found");

  const valid = await bcrypt.compare(password,user.rows[0].password);
  if(!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    {id:user.rows[0].id},
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      id:user.rows[0].id,
      name:user.rows[0].name,
      email:user.rows[0].email
    }
  });
});

export default router;
