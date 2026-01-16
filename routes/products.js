import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req,res)=>{
  const products = await pool.query("SELECT * FROM products");
  res.json(products.rows);
});

router.post("/", async (req,res)=>{
  const {name,description,price,image_url} = req.body;
  const product = await pool.query(
    "INSERT INTO products(name,description,price,image_url) VALUES($1,$2,$3,$4) RETURNING *",
    [name,description,price,image_url]
  );
  res.json(product.rows[0]);
});

export default router;
