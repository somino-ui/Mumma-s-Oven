import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PublicLayout from './PublicLayout';
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserCheck, FaUserPlus } from "react-icons/fa";

const Login = () => {
    

    const [formData, setFormData] = useState({
        Emailcont: "",
        password: "",
           
          })
    
      const navigate = useNavigate();
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]:value
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { Emailcont , password}= formData;
    
        try {
          const response = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
             headers:{
                    'Content-Type':'application/json',},
                     body: JSON.stringify({Emailcont , password }), 
    
          });
    
          const result = await response.json();
    
          if (response.status === 200) {
            toast.success(result.message|| 'Login Successful');
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userName', result.userName);
            setFormData({

             Emailcont: "",
             password: "",
            
            });
            setTimeout(() => {
                navigate('/');
            },2000);
            
          } else {
            toast.error(result.message || 'Invalid Creadential. Please try again.');
          }
        } 
        
        catch (error) {
          console.error(error);
          toast.error("Error connecting to the server");
        }
      };
  return (
    <PublicLayout>
        <ToastContainer position="top-center" autoClose={2000} />
    <div className='container py-5 ' style={{backgroundColor:'#EAEFEF'}}>
        <div className='row align-items-center '>
            <div className='col-md-6 p-4'>    
            <h3 className='text-center mb-4 text-primary'> 
                <FaUserCheck className="me-1"/>User Login</h3>

                <form className="card p-4 shadow" onSubmit={handleSubmit}>
                
              
              <div className="mb-3">
                
                <input
                  name="Emailcont"
                  type="text"
                  className="form-control"
                  value={formData.Emailcont}
                  onChange={handleChange}
                  placeholder=" Email or Mobile Nunber"
                  required
                />
              </div>
              
              <div className="mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" Password"
                  required
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className='btn btn-primary'>
                    < FaSignInAlt classname="me-2"/> Login </button>

                     <button className='btn btn-outline-secondary' onClick={() => navigate('/register')}>
                    < FaUserPlus className="me-2 ms-2"/> Register </button>
              </div>
                </form>
            </div>


            <div className='col-md-6 d-flex align-items-center justify-content-center bg-light rounded'> 
                <div classname="text-center">
                    <img src="/images/login.png"  className='img-fluid rounded-3 w-75' ></img>
                    </div> 
            </div>

            
        </div>
    </div>
     </PublicLayout>
  )
}

export default Login
