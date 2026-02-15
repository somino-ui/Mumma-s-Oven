import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const userId = localStorage.getItem("userId");
  const [paymentMode, setPaymentMode] = useState("");
  const [address, setAddress] = useState("");
  const [cardDetails, setCarddetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (paymentMode === "online") {
      const { cardNumber, expiry, cvv } = cardDetails;

      if (!cardNumber || !expiry || !cvv) {
        toast.error("Please fill in all card details");
        return;
      }
    }

      try {
                const response = await fetch('http://127.0.0.1:8000/api/place_order/',{
                   method: "POST",
                   headers:{'Content-Type':'application/json',},
                           body: JSON.stringify({
                            userId:userId,
                            address:address,
                            paymentMode:paymentMode,
                            cardNumber: paymentMode === 'online' ?  cardDetails.cardNumber:'',
                            expiry: paymentMode === 'online' ?  cardDetails.expiry:'',
                            cvv: paymentMode === 'online' ?  cardDetails.cvv:'',
                          }), 
          
                });
          
                const result = await response.json();
          
                if (response.status === 201) {
                  toast.success(result.message);
                  setTimeout(() => {
                      navigate('/my-orders');
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

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container py-5">
        <h3 className="text-center text-dark mb-4">
          <i className="fas fa-credit-card me-2"></i> Checkout and Payment{" "}
        </h3>

        <div className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label fw-semibold"> Delivery Address</label>
            <textarea
              className="form-control border-primary-subtle"
              required
              rows="3"
              placeholder="Enter Your Full Delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              {" "}
            </textarea>
          </div>

          <div className=" form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMode"
              value="cod"
              required
              checked={paymentMode === "cod"}
              onChange={(e) => setPaymentMode("cod")}
            />
            <label className="form-check-label "> Cash on Delievery</label>
          </div>
          <div className=" form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMode"
              required
              value="online"
              checked={paymentMode === "online"}
              onChange={(e) => setPaymentMode("online")}
            />
            <label className="form-check-label "> Online payment</label>
          </div>
          {paymentMode === "online" && (
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Card Number</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="1234 **** ****"
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    setCarddetails({
                      ...cardDetails,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Expiry</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCarddetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Cvv</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="***"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCarddetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <button
            className="btn btn-success mt-4 w-100"
            onClick={handlePlaceOrder}
          >
            <i className="fas fa-check-circle"></i> Confirm and place order
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Payment;
