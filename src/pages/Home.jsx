import axios from "axios";
import {useEffect,useState} from "react";
import ProductCard from "../components/ProductCard";

export default function Home(){
  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/products")
      .then(res=>setProducts(res.data));
  },[]);

  return(
    <div className="container mt-4">
      <h2 className="mb-4">Mini Store</h2>
      <div className="row">
        {products.map(p=>(
          <div key={p.id} className="col-md-4">
            <ProductCard product={p}/>
          </div>
        ))}
      </div>
    </div>
  );
}
