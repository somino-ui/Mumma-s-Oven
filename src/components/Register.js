import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PublicLayout from './PublicLayout';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
       firstname: "",
        Lastname: "",
        MobileNO: "",
        Email: "",
        Password: "",
        ConfirmPassword:"",
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

    const {firstname , Lastname , MobileNO , Email , Password , ConfirmPassword}= formData;

    if (Password !== ConfirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
         headers:{
                'Content-Type':'application/json',},
                 body: JSON.stringify({
                        first_name: firstname,
                        last_name: Lastname,
                        email: Email,
                        mobile: MobileNO,
                        password: Password,   
                                       }), 

      });

      const result = await response.json();

      if (response.status === 201) {
        toast.success(result.message|| 'You have registered successfully');
        setFormData({
        firstname: "",
        Lastname: "",
        MobileNO: "",
        Email: "",
        Password: "",
        ConfirmPassword:"",
        });

        setTimeout(() => {
                navigate('/login');
            },2000);
      } else {
        toast.error(result.message || 'Something WEnt Wrong. Please try again.');
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
    <div className='container py-5'style={{backgroundColor:'#EAEFEF'}}>
        <div className='row shadow-lg rounded'>
            <div className='col-md-6 p-4'> 
            <h3 className='text-center mb-4 text-primary'> 
                <i className='fas fa-user-plus me-2'></i> User Registration</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                <input
                  name="firstname"
                  type="text"
                  className="form-control"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder=" First Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="Lastname"
                  type="text"
                  className="form-control"
                  value={formData.Lastname}
                  onChange={handleChange}
                  placeholder=" Last Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="Email"
                  type="text"
                  className="form-control"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder=" Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="MobileNO"
                  type="text"
                  className="form-control"
                  value={formData.MobileNO}
                  onChange={handleChange}
                  placeholder=" Mobie No"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="Password"
                  type="password"
                  className="form-control"
                  value={formData.Password}
                  onChange={handleChange}
                  placeholder=" Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                        name="ConfirmPassword"
                        type="password"
                        className="form-control"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        />

              </div>
              <div>
                <button className='btn btn-primary w-100'>
                    <i className='fas fa-user-check me-2'> </i>Submit

                </button>
              </div>
                </form>
            </div>


            <div className='col-md-6 d-flex align-items-center justify-content-center bg-light rounded'> 
                <div classname="p-4 text-center">
                    <img src="/images/register.jpg"  className='img-fluid' style={{maxheight:"300px"}}></img>
                    <h5 className='mt-3 text-center' >Registration is  Fast Secure and Free </h5>
                    <p className='text-mutet small text-center'> Join our family and enjoy delicious cake Delivered to your door</p>
                    </div> 
            </div>


        </div>
    </div>
     </PublicLayout>
  )
}

export default Register;
