import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register(){
  const [form,setForm] = useState({name:"",email:"",password:""});
  const navigate = useNavigate();

  const submit = async ()=>{
    await axios.post("http://localhost:5000/api/auth/register",form);
    alert("Registered successfully");
    navigate("/login");
  };

  return(
    <div className="container mt-5 col-md-4">
      <h3>Register</h3>
      <input className="form-control mb-2" placeholder="Name"
        onChange={e=>setForm({...form,name:e.target.value})}/>
      <input className="form-control mb-2" placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="form-control mb-2" type="password" placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="btn btn-success w-100" onClick={submit}>
        Register
      </button>
    </div>
  );
}
