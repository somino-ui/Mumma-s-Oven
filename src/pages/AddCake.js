import React, { useState, useEffect } from "react";
import AdminLayout from "../components/Adminlayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCake = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    item_name: "",
    item_description: "",
    item_quantity: "",
    item_price: "",
    image: null,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) =>({
        ...prevData,
        [name]:value
    }))

    
    }

    const handleFileChange = (e) => {
    
    setFormData((prevData) =>({
        ...prevData,
        image:e.target.files[0]
    }))

    
    }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category",formData.category);
    data.append("item_name",formData.item_name);
    data.append("item_description",formData.item_description);
    data.append("item_quantity",formData.item_quantity);
    data.append("item_price",formData.item_price);
    data.append("image",formData.image);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add-cake-item/", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.status === 201) {
        toast.success(result.message);
        setFormData({
          category: "",
          item_name: "",
          item_description: "",
          item_quantity: "",
          item_price: "",
          image: null,
        });
      } else {
        toast.error(result.message);
      }
    } 

    catch (error) {
      console.error(error);
      toast.error("Error connecting to the server");
    }
  };
  return (
    <AdminLayout>
      <ToastContainer autoclose={2000} position="top-center" />

      <div className="row">
        <div className="col-md-8">
          <div className="shadow-sm p-4 rounded">
            <h4 className="mb-4 ">
              <i className="fas fa-plus-circle text-primary me-2"></i> Add Cake
              Item
            </h4>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Cake Category </label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value=""> Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {" "}
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Cake Item Name </label>
                <input
                  name="item_name"
                  type="text"
                  className="form-control"
                  value={formData.item_name}
                  onChange={handleChange}
                  placeholder=" Enter Cake item name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Desciption </label>
                <textarea
                  name="item_description"
                   
                  className="form-control"
                  value={formData.item_description }
                  onChange={handleChange}
                  placeholder=" Enter Description"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity </label>
                <input
                  name="item_quantity"
                  type="text"
                  className="form-control"
                  value={formData.item_quantity }
                  onChange={handleChange}
                  placeholder=" e.g : 500g , 1kg "
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price </label>
                <input
                  name="item_price"
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={formData.item_price }
                  onChange={handleChange}
                
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  
                  onChange={handleFileChange}
                
                  required
                />
              </div>

              

              <button type="Submit" className="btn btn-primary  mt-3">
                <i className="fas fa-plus me-2"></i> Add Category
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <i
            className="fa-solid fa-user-tie" // fas fa-utensils
            style={{ fontSize: "180px", color: "#e5e5e5" }}
          ></i>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCake;
