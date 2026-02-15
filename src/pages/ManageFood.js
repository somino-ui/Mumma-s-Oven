import React, { useState, useEffect, } from "react";
import AdminLayout from "../components/Adminlayout";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

const ManageFood = () => {
  const [cakes, setCakes] = useState([]);
  const [allcakes, setAllCakes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cakes/")
      .then((response) => response.json())
      .then((data) => {
        setCakes (data);
        setAllCakes(data);
      });
  }, []);

  const handleSearch = (s) => {
    const keyword = s.toLowerCase();
    if (!keyword) {
      setCakes(allcakes);
    } else {
      const filtered = allcakes.filter((c) =>
        c.item_name.toLowerCase().includes(keyword),
      );
      setCakes(filtered);
    }
  };
  return (
    <AdminLayout>
      <div>
        <h3 className="text-center text-primary mb-4">
          <i className="fas fa-list-alt"></i> Manage Cake Items 
        </h3>

        <h5 className="text-end text-muted">
          <i className="fas fa-database me-1"></i>Total Cakes Items
          <span className="ms-2 badge bg-success">{cakes.length}</span>
        </h5>

        <div className="mb-3 d-flex  justify-content-between">
          <input
            type="text"
            className="form-control w-50  "
            placeholder="Search by Cakes name.."
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
          <CSVLink
            data={cakes}
            className="btn btn-success mt-3"
            filename="Cake_list.csv"
          >
            <i className="fas fa-file-csv me-2"></i>Export to CSV
          </CSVLink>
        </div>

        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th> S.no </th>
              <th>Category Name</th>
              <th> Cakes item name </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
            {cakes.map((cake, index) => (
              <tr key={cake.id}>
                <td>{index + 1} </td>
                <td> {cake.category_name}</td>
                <td> {cake.item_name}</td>
                <td>
                  <Link className="btn btn-sm btn-primary me-2">
                    <i className="fas fa-edit me-1"></i>Edit
                  </Link>

                  <button className="btn btn-sm btn-danger">
                    <i className="fas fa-trash me-1"></i>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageFood;
