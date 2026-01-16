import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req,res)=>{
  const {user_id,product_id,quantity} = req.body;

  await pool.query(
    "INSERT INTO cart_items(user_id,product_id,quantity) VALUES($1,$2,$3)",
    [user_id,product_id,quantity]
  );

  res.json("Added to cart");
});

router.get("/:user_id", async (req,res)=>{
  const cart = await pool.query(
    `SELECT c.id, p.id as product_id, p.name, p.price, c.quantity
     FROM cart_items c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id=$1`,
    [req.params.user_id]
  );

  res.json(cart.rows);
});

export default router;
