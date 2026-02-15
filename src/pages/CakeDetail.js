import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'

const CakeDetail = () => {
  const userId = localStorage.getItem("userId");
  const [cake, setCake] = useState(null);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cakes/${id}`)
      .then((response) => response.json())
      .then((data) => {
          setCake(data);
      });
  }, []);

const handleAddToCart = async () => {
        if(!userId){
          navigate('/login');
          return;
        }
        
        try {
          const response = await fetch("http://127.0.0.1:8000/api/cart/add/", {
            method: "POST",
             headers:{
                    'Content-Type':'application/json',},
                     body: JSON.stringify({
                      userId:userId,
                      cakeId:cake.id
                    }), 
    
          });
    
          const result = await response.json();
    
          if (response.status === 200) {
            toast.success(result.message|| 'Item added to cart');
            setTimeout(() => {
                navigate('/cart');
            },2000);
            
        
            
          } else {
            toast.error(result.message || 'Something went Wrong');
          }
        } 
        
        catch (error) {
          console.error(error);
          toast.error("Error connecting to the server");
        }
      };

  if (!cake) return <div>Loading....</div>;
  
  return (
    <PublicLayout>
      
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="py-5 container">
        <div className="row">
          <div className="col-md-5 text-center">
            
            <img
              src={`http://127.0.0.1:8000${cake.image}`}
               alt={cake.item_name}
               className="img-fluid"
              style={{ cursor: "pointer" }}
                onClick={() => setSelectedImage(`http://127.0.0.1:8000${cake.image}`)}
                />
{selectedImage && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: 9999
    }}
    onClick={() => setSelectedImage(null)}
  >
    <img
      src={selectedImage}
      alt="Zoomed"
      style={{ maxHeight: "90%", maxWidth: "90%" }}
    />
  </div>
)}

          </div>
          <div className="col-md-7 ">
            <h2> {cake.item_name}</h2>
            <p className="text-muted"> {cake.item_description}</p>
            <p>
              <strong> Category:</strong> {cake.category_name}
            </p>
            <h4>₹{cake.item_price} </h4>
            <p className="mt-3">
              {" "}
              <strong>Free</strong>
            </p>

            {cake.is_available ? (
              <button  onClick={handleAddToCart}className="btn btn-warning btn-lg mt-3 px-4">
                <i className="fas fa-cart-plus me-1"></i> Add to Cart
              </button>
            ) : (
              <div title="This item is not currently available. Please check back later.">
                <button className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-times-circle"></i> currently unavailable
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default CakeDetail;
