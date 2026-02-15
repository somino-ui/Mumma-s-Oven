import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";


const MyOrders = () => {

    const userId = localStorage.getItem("userId");
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    
      useEffect(() => {
        if(!userId){
            navigate('/login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/orders/${userId}`)
          .then((response) => response.json())
          .then((data) => {
              setOrders(data);
                
          })
    
        }, [userId]);
    


    return (
        <PublicLayout>
      <div className="py-5 container ">
        <h3 className="text-center mb-4"> 
            <FaBoxOpen className="text-warning " size={ 40}/> My Orders </h3>


            {orders.length === 0 ? (
                <p className="text-muted text-muted"> You Have Not placed Any orders yet..</p>
                
            ):(
            orders.map((order,index)=> (
            <div  class="card mb-4 shadow-sm"key={index}> 
                    <div class="card-body d-flex align-items-center flex-wrap">  
                        <div className="me-2">
                            <FaBoxOpen className="text-warning " size={ 25}/>
                            </div>

                            <div  className="flex-grow-1">
                                 <h5 className="mb-1"> 
                                    <Link> 
                                    Order #{ order.order_number}
                                    </Link></h5>
                                    <p className="text-muted mb-1">
                                            <strong> Date: </strong>{new Date(order.order_time).toLocaleString()}
                                    </p>
                                    <span className="badge bg-secondary"> {order.order_final_status}</span>
                            </div>
                                <div className="mt-3 mt-md-0">
                                    <Link className="btn btn-outline-danger btn-sm ms-2 me-2"> 
                                    <FaMapMarkedAlt/>  Track
                                    </Link>

                                    <Link className="btn btn-outline-secondary btn-sm ms-2 me-2" to={`/order-details/${order.order_number}`}> 
                                    <FaInfoCircle/>  View Details
                                    </Link>
                                </div>
                    </div>
            </div>
            ))
        
        )}
        </div>
        </PublicLayout>
    );
};

export default MyOrders;
