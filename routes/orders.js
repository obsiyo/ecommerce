import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req,res)=>{
  const {user_id,total_amount,items} = req.body;

  // create order
  const order = await pool.query(
    "INSERT INTO orders(user_id,total_amount,status) VALUES($1,$2,'Paid') RETURNING id",
    [user_id,total_amount]
  );

  // insert order items
  for(const item of items){
    await pool.query(
      "INSERT INTO order_items(order_id,product_id,quantity,price) VALUES($1,$2,$3,$4)",
      [order.rows[0].id,item.product_id,item.quantity,item.price]
    );
  }

  // clear cart
  await pool.query("DELETE FROM cart_items WHERE user_id=$1",[user_id]);

  res.json("Order placed successfully");
});

router.get("/:user_id", async (req,res)=>{
  const orders = await pool.query(
    "SELECT * FROM orders WHERE user_id=$1",
    [req.params.user_id]
  );
  res.json(orders.rows);
});

export default router;
