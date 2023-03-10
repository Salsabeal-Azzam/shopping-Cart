import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddItemToCart from './../components/AddItemToCart';

const Product = () => {

  const [products,productsState] = useState(null);
  const sorcImag = 'http://localhost:3000/api/v1/image';

  function displayData(){

       axios.get("http://localhost:3000/api/v1/product").then((res)=>{
          let {data} = res;
          productsState(data);
       }).catch((err)=>{
        console.log(err.message);
       })
   };

   useEffect(()=>{
       displayData();
    },[]);
  return (
    <>
      <div className="container py-5">
          <div className='row'>
                {products && products.map((item,index) =>(
                         <div key={index} className='col-md-4'>
                                <div className="item text-center mb-2 pb-2">
                                    <img className='w-100' src={`${sorcImag}${item.photos[0]}`} alt="" />
                                    <div className="cart-Title mt-2">
                                    <h6>{item.product_name}</h6>
                                    <h6>{item.number_of_items<3?`Only ${item.number_of_items} left in stock`:item.number_of_items}</h6>
                                    <span>{item.price} EGP</span>
                                    <h6>Store : {item.created_by.user_name}</h6>
                                    </div>
                                    {/* <button onClick={()=>{addItem(item)}} className='btn mainColor text-white w-100'>Add to cart</button> */}
                                    <AddItemToCart item={item}/>
                                </div>
                          </div>

                ))}

      
          </div>
      </div>  
    </>
  )
}

export default Product