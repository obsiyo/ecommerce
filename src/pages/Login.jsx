import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login(){
  const [form,setForm] = useState({email:"",password:""});
  const navigate = useNavigate();

  const submit = async ()=>{
    const res = await axios.post("http://localhost:5000/api/auth/login",form);
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("user",JSON.stringify(res.data.user));
    navigate("/");
  };

  return(
    <div className="container mt-5 col-md-4">
      <h3>Login</h3>
      <input className="form-control mb-2" placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="form-control mb-2" type="password" placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="btn btn-primary w-100" onClick={submit}>
        Login
      </button>
    </div>
  );
}
