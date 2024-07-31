import { useState } from 'react'
import Layout from '../../Component/Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import "../../styles/authStyle.css"
import { useAuth } from '../../src/Context/auth';



const Login = () => {
    const [auth, setAuth] = useAuth();
   
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_URL

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, { email, password })
           
            if (res && res.data.success) {
                toast.success(res.data.message)
                
                setAuth({...auth, 
                    user: res.data.user,
                    token:res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate("/")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error", error)
            toast.error("Something went wrong")
        }
    };
    
  return (
      <Layout>
          <div className='form-container'>
                <h1>Login Page</h1>
           <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email"  value={email}className="form-control" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} />
                     
                    </div>
                   
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password"  value={password} className="form-control" id="exampleInputPassword1"onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                  <div className='mb-3'> <button type="submit" className="btn btn-primary">Login</button></div>
                   
                  <div className='mb-3'><button onClick={() =>  navigate("/forgot-password") } className="btn btn-primary">Forgot Password</button></div> 
                </form>
                </div>
          
    </Layout>
  )
}

export default Login