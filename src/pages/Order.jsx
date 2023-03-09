import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Action_buttons from './../components/Action_buttons';


const Order = () => {

    const sorcImag = 'http://localhost:3000/api/v1/image';

    const [items ,itemsState] = useState([]);

    const getData = ()=>{
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      if (dataLocal!=null) {
          itemsState(dataLocal);
      }
    };

    useEffect(()=>{
      getData();
    },[]);

    const [totalPrice,totalPriceState] = useState(0);
  
    useEffect(()=>{
      let arrayIteem = items;
      let totPric= arrayIteem.reduce((x,y) => x+(y.price * y.qty),0);
      totalPriceState(totPric);
    },[items]);
     
    window.addEventListener("storage",(e) => {
      getData();
    });

    
  return (
    <>
     
     <div className="container py-5">

          <h2 className='cartItems my-3 pt-5'> Shopping Cart</h2>
          {items.length === 0?<h5 className='text-center h2'>Cart is empty</h5>:''}
          {items && items.map((item,index)=>(
                      <div  key={index} className='row py-3'>
                         <div className="col-md-3">
                             <img className='w-100' src={`${sorcImag}${item.photos[0]}`} alt=""/>
                         </div>
                       <div className="col-md-6 offset-md-1 d-flex align-items-center">
                        <div className="">
                           <h6>{item.product_name}</h6>
                           <p className='price'>{item.price}EL</p>
                           <Action_buttons item={item}/>
                        </div>

                      </div>
                  </div>
          ))}
          <div className="row mt-5">
            <div className="offset-md-8 col-md-3 mt-5 position-relative">
            <p className="text-white text-center mainColor">Total:{totalPrice} EGP</p>
            <Link to='/order' className="btn btn-success position-absolute end-0 mx-2 w-25">Next</Link>
            </div>
            </div>
      </div>  
    
    </>
  )
}

export default Order