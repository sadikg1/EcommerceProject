
import { useState } from 'react';
import Layout from '../../Component/Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import "../../styles/authStyle.css"




const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [address,setAddress]=useState("")
    const [phone, setPhone] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_APP_URL
    
    //submit handling
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, { name, email, password, phone, address,answer })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error",error)
            toast.error("Something went wrong")
        }
        }
    

    return (
        <Layout title="Register-Ecommerce app">
            <div className='form-container'>
                <h1>Register Yourself</h1>
           

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                       
                        <input value={name} type="text" className="form-control" id="exampleInputEmail1" onChange={(e)=>setName(e.target.value)}  placeholder="Enter Your Name"/>
                     
                    </div>
                    <div className="mb-3">
                        
                        <input type="email"  value={email}className="form-control" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Your Email Address" />
                     
                    </div>
                   
                    <div className="mb-3">
                      
                        <input type="password"  value={password} className="form-control" id="exampleInputPassword1"onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Your Password"/>
                    </div>
                    <div className="mb-3">
                      
                        <input type="text"  value={phone} className="form-control" id="exampleInputPassword1" onChange={(e)=>setPhone(e.target.value)}  placeholder="Enter Your Phone Number"/>
                    </div>
                    <div className="mb-3">
                     
                        <input type="text"  value={address}className="form-control" id="exampleInputPassword1" onChange={(e)=>setAddress(e.target.value)}  placeholder="Enter Your Address"/>
                    </div>
                    <div className="mb-3">
                      
                        <input type="text" value={answer}className="form-control" id="exampleInputPassword1" onChange={(e)=>setAnswer(e.target.value)}  placeholder="Enter Your First School name"/>
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
          
        </Layout>
    );
}

export default Register