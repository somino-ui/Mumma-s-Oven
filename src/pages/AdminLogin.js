import React,{useState} from 'react'
import {FaUser ,FaLock,} from 'react-icons/fa';
import { FaSignInAlt } from "react-icons/fa";
import '../styles/admin.css';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicLayout from '../components/PublicLayout';
const AdminLogin = () => {

    const[username, setUsername]= useState('');
    const[password, setPassword]= useState('');
    const handleLogin = async(e)=>{
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/admin-login/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',},
                body:JSON.stringify({username,password}),
        });

        const data = await response.json();

        if(response.status===200) {
            toast.success(data.message);
            localStorage.setItem('adminUser',username);
            setTimeout(()=>{
                
                window.location.href='/admin-dashboard';
            },2000)
        } 
        else{
            toast.error(data.message);
        }     
    }
  return (
    <PublicLayout>
    <div className="d-flex justify-content-center align-items-center vh-100 " 
    style={{backgroundImage:"url('/images/adminbg11.jpg')"}}>
    <div className="card p-4 shadow=lg" style={{maxWidth:"400px",width:'100%'}} >
      <h4 className="text-center "> 
        <FaUser className="me-2"/>Admin Login </h4>
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label className="form-label"> 
                    <FaUser className="me-1 icon-fix" /> Username </label>
                 <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}  placeholder=' Enter your Name bitch' required />  
            </div>

            <div className="mb-3">
                <label className="form-label"> 
                    <FaLock className="me-1 icon-fix" /> password </label>
                 <input type="password" className="form-control" value={password} placeholder='Enter Password MF' required onChange={(e)=>setPassword  (e.target.value)} />  
            </div>
            <button type="Submit" className="btn btn-primary w-100 mt-3">
                <FaSignInAlt className='ms-1 icon-fix'/> Login 
            </button>  
        </form> 
    </div>
        <ToastContainer autoclose={2000} position='top-center' />
    </div>
    </PublicLayout>
  )
}


export default AdminLogin;
