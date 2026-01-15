import axios from "axios";
import {useEffect,useState} from "react";

export default function Cart(){
  const [cart,setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    if(!user){
      window.location.href="/login";
      return;
    }

    axios.get(`http://localhost:5000/api/cart/${user.id}`)
      .then(res=>setCart(res.data));
  },[]);

  const checkout = async ()=>{
    const total = cart.reduce((sum,i)=>sum + i.price*i.quantity,0);

    await axios.post("http://localhost:5000/api/orders",{
      user_id:user.id,
      total_amount:total,
      items:cart.map(i=>({
        product_id:i.product_id,
        quantity:i.quantity,
        price:i.price
      }))
    });

    window.location.href="/success";
  };

  return(
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {cart.map(i=>(
        <div key={i.id} className="border p-2 mb-2">
          {i.name} — {i.quantity} × {i.price} ETB
        </div>
      ))}

      <button className="btn btn-warning" onClick={checkout}>
        Checkout
      </button>
    </div>
  );
}
