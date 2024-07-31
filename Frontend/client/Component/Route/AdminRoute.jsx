

import { useAuth } from '../../src/Context/auth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'

const AdminRouters =() =>{
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const API_BASE_URL = import.meta.env.VITE_APP_URL
  
    useEffect(() => {
      const authCheck = async () => {
          const res = await axios.get(`${API_BASE_URL}/api/v1/auth/admin-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Spinner path="" />;
}

export default AdminRouters