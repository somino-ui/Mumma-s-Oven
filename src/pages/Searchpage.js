import React,{useEffect, useState} from 'react'
import PublicLayout from '../components/PublicLayout';
import { Link,useLocation } from 'react-router-dom';
import '../styles/home.css';

const Searchpage = () => {
  const query = new URLSearchParams(useLocation ().search) .get('q') || '';
  const [cakes,setCakes] = useState ([]);


  useEffect(() => {
      if(query){
        fetch(`http://127.0.0.1:8000/api/cakes_search/?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setCakes (data);
        });
          
      }
    }, [query]);
  
  return (
    <PublicLayout>
    <div className='container py-4 ' >
      <h3 className='text-primary text-center'> Results for: "{query}"</h3>
      <div className='row mt-4'>
        {cakes.length===0 ? (
          <p className='text-center'>
            No cakes found matching your search.  
          </p>
        ):( cakes.map((cake, index) => (
        
        <div className='col-md-4 mb-4 '>
            <div className='card hovereffect'>
                <img src= {`http://127.0.0.1:8000${cake.image}`} alt='Cake 1' className='card-img-top' style={{ height:"180px"}}/>
                <div className='card-body '>
                    <h5 className='card-title'> 
                        <Link to="#">{cake.item_name} {cake.image}</Link> </h5>
                        <p className='card-text text-muted'> {cake.item_description?.slice(0,40)}... </p>
                        <div  className='d-flex justify-content-between align-items-center'>
                          <span className="fw-bold">  ₹ {cake.item_price}</span>
                              {cake.is_available ? (
                                <Link to="#" className="btn btn-outline-primary btn-sm">
                             <i className='fas fa-shopping-basket'></i> order now
                          </Link>
                              ):(
                                <div title="This item is not currently available. Please check back later.">
                                  <button className="btn btn-outline-secondary btn-sm">
                             <i className='fas fa-times-circle me-1'></i> currently unavailable
                          </button>
                                  </div>
                              )}
                          
                        </div>
                </div>


            </div>

        </div>) 
        ))} 
       

      </  div>
    </div>
    </PublicLayout>
  )
}

export default Searchpage;
