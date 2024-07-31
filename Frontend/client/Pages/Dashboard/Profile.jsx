import React, { useEffect, useState } from 'react'
import Layout from '../../Component/Layout'
import Usermenu from '../../Component/Usermenu'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../src/Context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    const[auth,setAuth]=useAuth()
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
            const {data} = await axios.put(`${API_BASE_URL}/api/v1/auth/profile`, { name, email, password, phone, address })
            if (data?.error) {
                toast.error(data?.error);
              } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
              }
        } catch (error) {
            console.log("Error",error)
            toast.error("Something went wrong")
        }
   
    }
      //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);
    return (
        
            <Layout>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3 ">
                            <Usermenu />
                        </div>
                        <div className="col-md-9 ">
                        <div className='form-container'>
                <h1>User Profile</h1>
           

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                       
                        <input value={name} type="text" className="form-control" id="exampleInputEmail1" onChange={(e)=>setName(e.target.value)}  placeholder="Enter Your Name"/>
                     
                    </div>
                    <div className="mb-3">
                        
                        <input type="email"  value={email}className="form-control" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Your Email Address" disabled/>
                     
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
                   
                   
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
                        </div>
                    </div>
                </div>
            </Layout>
       
    );
}

export default Profile