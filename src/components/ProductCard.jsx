import axios from "axios";

export default function ProductCard({product}){

  const addToCart = async ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user) return alert("Login first");

    await axios.post("http://localhost:5000/api/cart",{
      user_id:user.id,
      product_id:product.id,
      quantity:1
    });

    alert("Added to cart");
  };

  return(
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <img src={product.image_url || "https://via.placeholder.com/300"} 
         className="card-img-top"
        />

        <p className="card-text">{product.price} ETB</p>
        <button className="btn btn-primary" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
