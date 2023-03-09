
import React from 'react'
import { Link } from 'react-router-dom';


const Order = (props) => {
    const {items , addItem , removeItem , removeProduct , totalPrice} = props;
    console.log(items);
    const sorcImag = 'http://localhost:3000/api/v1/image';

    
  return (
    <>
     
     <div className="container py-5">

          <h2 className='cartItems my-3 pt-5 text-center'>Order Page</h2>
          {items.length === 0?<h5 className='text-center h2'>Cart is empty</h5>:''}
          {items && items.map((item,index)=>(
                      <div  key={index} className='row py-3 my-2 '>
                         <div className="col-md-3">
                             <img className='w-100' src={`${sorcImag}${item.photos[0]}`} alt=""/>
                         </div>
                       <div className="col-md-5 mt-md-1 pt-4 mt-sm-4 mx-3 d-flex align-items-center">
                           <div>
                           <h6>{item.product_name}</h6>
                           <p>{item.price}EL</p>
                           <p>item number{item.number_of_items}</p>
                           <button onClick={()=>{addItem(item)}} className='btn btn-info'><i className="fa-solid fa-plus"></i></button>
                          <span className="px-3">{item.qty}</span>
                          <button onClick={()=>{removeItem(item)}} className='btn btn-danger me-3'><i className="fa-solid fa-minus"></i></button>
                          <button onClick={()=>{removeProduct(item)}} className="btn btn-danger ml-3"><i className="fa-solid fa-trash-can"></i></button>
                           </div>
                      </div>
                  </div>
          ))}
          <div className="row">
            <div className="offset-md-8 col-md-3">
            <p className="text-white text-center mainColor">Subtotal:{totalPrice} EGP</p>
            <Link to='/cart' className="btn btn-success">Back to cart</Link>
            </div>
            </div>
      </div>  
    
    </>
  )

}

export default Order