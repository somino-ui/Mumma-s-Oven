import React,{useState} from 'react'
import AdminLayout from '../components/Adminlayout'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCategory = () => {
    const [categoryName, setcategoryName]= useState('');

       const handleSubmit = async(e)=>{
            e.preventDefault();

            try{
            const response = await fetch('http://127.0.0.1:8000/api/add-category/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'},
                    body:JSON.stringify({category_name : categoryName}),
            });
    
            const data = await response.json();
    
            if(response.status === 201) {
                toast.success(data.message);
                    
            } 
            else{
                toast.error("Failed to add category");
            }     
        }
                
                catch(error){
                    console.error(error);
        toast.error("Error connecting to the server");
                }
    };
  return (

    
    <AdminLayout>
        <ToastContainer autoclose={2000} position='top-center' />

    <div className="row">
            <div className="col-md-8">
                <div className="shadow-sm p-4 rounded">
                    <h4 className="mb-4 ">
                       <i className="fas fa-plus-circle text-primary me-2" ></i> AddCategory</h4>

                       <form onSubmit={handleSubmit}>
                                   <div className="mb-3">
                                       <label className="form-label"> 
                                           Category Name </label>
                                        <input type="text" className="form-control" value={categoryName} onChange={(e)=>setcategoryName(e.target.value)}  placeholder=' Enter category name' required />  
                                   </div>
                       
                                   
                                   <button type="Submit" className="btn btn-primary  mt-3">
                                     <i className='fas fa-plus me-2'></i>   Add Category
                                   </button>  
                               </form> 

                </div>

            </div>   
            <div className="col-md-4 d-flex justify-content-center align-items-center">
                <i className="fas fa-utensils " style={{fontSize:"180px" , color:"#e5e5e5"}}></i>
                
            </div>   
    </div>


    </AdminLayout>
  )
}

export default AddCategory
