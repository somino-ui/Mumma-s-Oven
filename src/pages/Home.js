import React,{useEffect, useState} from 'react'
import PublicLayout from '../components/PublicLayout'
import '../styles/home.css'
import { Link } from 'react-router-dom';


const Home = () => {
  const [cakes,setCakes] = useState ([]);
  
  
    useEffect(() => {
        
          fetch(`http://127.0.0.1:8000/api/random_cakes`)
          .then((response) => response.json())
          .then((data) => {
            setCakes (data);
          });
            
        
      }, []);
  return (
    <PublicLayout> 
    <section  className=" hero  text-center "style={{backgroundImage: "url('/images/adminbg2.jpg')"}}>
      <div className=""style={{backgroundColor: "rgba(0,0,0,0.4)",padding:"40px 20px",
        borderRadius:"10px", maxWidth:"800px", 

       }}>
       <h1 className="display-4">Handmade cakes, baked fresh for every occasion</h1>
       <p className="lead"> Craving Something tasty? let's get it to Your Door!! </p>
       <form method="GET" action="/search" className='d-flex' style={{maxWidth:"600px", margin:"20px auto"}}>
       <input type="text" name="q" placeholder='Search for Cakes' className='form-control'
       style={{ borderTopRightRadius:0, borderBottomRightRadius:0 }}/>
       <button className="btn btn-warning px-4"
       style={{ borderTopLeftRadius:0, borderBottomLeftRadius:0 }}> Search</button>

       </form>
    </div>
    </section>
    <section className="py-5">
        <div className='container'>
        <h2 className='text-center mb-4'>Most loved cakes ThIss Months
          <span className='badge bg-danger ms-2'>Top Picks</span>
        </h2>
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
                        <Link to={`/cake/${cake.id}`}>{cake.item_name} {cake.image}</Link>
                         </h5>
                        <p className='card-text text-muted'> {cake.item_description?.slice(0,40)}... </p>
                        <div  className='d-flex justify-content-between align-items-center'>
                          <span className="fw-bold">  ₹ {cake.item_price}</span>
                              {cake.is_available ? (
                                <Link to={`/cake/${cake.id}`} className="btn btn-outline-primary btn-sm">
                             <i className='fas fa-shopping-basket'></i> order now
                          </Link>
                              ):(
                                <div title="This item is not currently available. Please check back later.">
                                  <button className="btn btn-outline-secondary btn-sm">
                             <i className='fas fa-times-circle'></i> currently unavailable
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
    </section>

        <section className="py-5 text-white bg-dark">
          <div className='container text-center'>
            <h2>Ordeering in 3 Simple Steps</h2>
            <div className='row mt-4'>
              <div className='col-md-4'>
                <h4>1. Choose Your Favorite Cake</h4>
                <p>From classic chocolate to custom designer cakes, we’ve got something for every sweet moment !!</p>

              </div>
              <div className='col-md-4'>
                <h4>2. Customize & Share Delivery Detail</h4>
                <p>Add a personal touch to make your cake truly special !!</p>

              </div>
              <div className='col-md-4'>
                <h4>3. Enjoy Fresh Doorstep Delivery </h4>
                <p>Perfectly packed. Freshly baked. Delivered with love..</p>

              </div>

            </div>
            <p>Pay easily with Cash On Delivery - hassle-free!</p>
          </div>

        </section>

        <section className="py-5 text-center bg-warning text-dark"> 
          <h4>Ready to make your special moments sweeter?</h4>
          <Link to=""className='btn btn-dark btn-lg'>
          Browse Full Menu

          </Link>
        </section>

    </PublicLayout>
    
  )
}

export default Home
