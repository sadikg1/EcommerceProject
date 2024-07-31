import { useState } from 'react';
import Layout from '../../Component/Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../styles/authStyle.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/auth/forgot-password`, { email, newPassword, answer });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="form-container">
                <h1>Password Reset</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">Email address</label>
                        <input 
                            type="email" 
                            value={email} 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">New Password</label>
                        <input 
                            type="password" 
                            value={newPassword} 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">What is your first school name?</label>
                        <input 
                            type="text" 
                            value={answer} 
                            className="form-control" 
                            id="exampleInputSecurityAnswer1" 
                            onChange={(e) => setAnswer(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
