import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import {FaChevronDown, FaChevronUp, FaCommentDots, FaEdit, FaList, FaSearch, FaThLarge, FaUsers} from 'react-icons/fa'

const AdminSidebar = () => {

const [openMenu,setOpenMenu]= useState({

    category:false,
    food:false,
    orders:false,
  })
  
  const toggleMenu=(menu)=>{
    setOpenMenu((prev)=>({...prev,[menu]:!prev[menu]}));

  }
  return (
    <div className="bg-dark text-white sidebar"> 
        <div className="text-center p-3 border-bottom" >
            <img src="/images/download.jpg" className="img-fluid rounded-cirlce mb-2" alt='admin' width="70" height="70"  />
            <h6 className="0">Admin</h6>
        </div>
        <div  className="list-group list-group-flush ">
          <Link className='list-group-item list-group-item-action bg-dark text-white ' >
          <FaThLarge/> Dashboard </Link>
          <div  className="list-group list-group-flush ">
          <Link className='list-group-item list-group-item-action bg-dark text-white ' >
          <FaCommentDots/> Manage Reviews </Link>
        </div>

        <div  className="list-group list-group-flush ">
          <Link className='list-group-item list-group-item-action bg-dark text-white ' >
          <FaSearch/> Search </Link>
        </div>

        <div  className="list-group list-group-flush ">
          <Link className='list-group-item list-group-item-action bg-dark text-white ' >
          <FaUsers/> Register User </Link>
        </div>

        <button onClick={()=>toggleMenu("category")} className='list-group-item list-group-item-action bg-dark text-white border-0'>
         <FaEdit/> Cake Category {openMenu.category ? <FaChevronUp/>: <FaChevronDown/>}
        </button>

        {openMenu.category && (
        <div className='ps-4  '>
          <Link  to="/add-category" className='list-group-item list-group-item-action bg-dark text-white border-0' >
           Add Category </Link>

          <Link to="/manage-category" className='list-group-item list-group-item-action bg-dark text-white border-0' >
           Manage Category </Link>
        </div>
               ) }
               
        <button  onClick={()=>toggleMenu("food")} className='list-group-item list-group-item-action bg-dark text-white border-0'>
         <FaEdit/> Cake Menu {openMenu.food ? <FaChevronUp/>: <FaChevronDown/>}
        </button>

        {openMenu.food && (
        <div className='ps-4 '>
          <Link  to="/add-cake"className='list-group-item list-group-item-action bg-dark text-white border-0' >
           Add cake Item </Link>

          <Link to ="/manage-food"className='list-group-item list-group-item-action bg-dark text-white border-0 ' >
           Manage Cake Item </Link>
           
           </div>
        
               )}
               
               <button  onClick={()=>toggleMenu("orders")} className='list-group-item list-group-item-action bg-dark text-white border-0'>
         <FaList/> Order {openMenu.orders ? <FaChevronUp/>: <FaChevronDown/>}
        </button>

        {openMenu.orders && (
        <div className='ps-4 '>
          <Link className='list-group-item list-group-item-action bg-dark text-white border-0' >
           Not Confirm </Link>

          <Link className='list-group-item list-group-item-action bg-dark text-white border-0 ' >
           Confirm </Link>
           <Link className='list-group-item list-group-item-action bg-dark text-white border-0 ' >
           Being Prepared </Link>
           <Link className='list-group-item list-group-item-action bg-dark text-white border-0 ' >
           Food Pickup </Link>
           <Link className='list-group-item list-group-item-action bg-dark text-white border-0 ' >
           Deliverd </Link>
           <Link className='list-group-item list-group-item-action bg-dark text-white border-0 ' >
           Cancled </Link>
           <Link to="/admin-orders" className='list-group-item list-group-item-action bg-dark text-white border-0 ' >
           All Orders </Link>
           
           </div>
        
               )}
               
        </div>
        

        

        

    
    </div>
  )
}

export default AdminSidebar
