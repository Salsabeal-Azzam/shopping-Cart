import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Cart = () => {

    const sorcImag = 'http://localhost:3000/api/v1/image';

    const [items ,itemsState] = useState([]);
    useEffect(()=>{
       let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
       if (dataLocal!=null) {
           itemsState(dataLocal);
       }
    },[]);
    const addToLocalStorage =(data)=>{
      localStorage.setItem("data-cart",JSON.stringify(data));
      window.dispatchEvent(new Event('storage'));
    };
  
    //add in cart function
    const addItem = (item)=>{
      let exist = items.find((elm)=>elm._id === item._id);
      if (exist) {
        let cart =items.map((elm)=>elm._id===item._id?{...exist,qty:exist.qty+1}:elm);
        itemsState(cart);
        // console.log(cart);
        console.log(items);
        addToLocalStorage(cart);
      }else{
        let itemAraay = [...items , {...item,qty:1}];
        itemsState(itemAraay);
        console.log(items);
        addToLocalStorage(itemAraay);
      }
    };
    // remove quonty in cart function
    const removeItem = (item)=>{
      let exist = items.find((elm)=>elm._id === item._id);
      if (exist.qty > 1) {
        let cart =items.map((elm)=>elm._id===item._id?{...exist,qty:exist.qty-1}:elm);
        itemsState(cart);
        console.log(items);
        addToLocalStorage(cart)
      }else{
         removeProduct(item);
      }
    };
    //remove product cart function
    const removeProduct = (item)=>{
        let cart = items.filter((elm)=>elm._id !== item._id);
        itemsState(cart);
        addToLocalStorage(cart)
    };
    const [totalPrice,totalPriceState] = useState(0);
  
    useEffect(()=>{
      let arrayIteem = items;
      let totPric= arrayIteem.reduce((x,y) => x+(y.price * y.qty),0);
      totalPriceState(totPric);
    },[items]);

    
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
                       <div className="col-md-6 offset-md-1">
                           <h6>{item.product_name}</h6>
                           <p className='price'>{item.price}EL</p>
                           <p>item number{item.number_of_items}</p>
                           <button onClick={()=>{addItem(item)}} className='btn btn-info'><i className="fa-solid fa-plus"></i></button>
                          <span className="px-3">{item.qty}</span>
                          <button onClick={()=>{removeItem(item)}} className='btn btn-danger me-3'><i className="fa-solid fa-minus"></i></button>
                          <button onClick={()=>{removeProduct(item)}} className="btn btn-danger ml-3"><i className="fa-solid fa-trash-can"></i></button>
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

export default Cart