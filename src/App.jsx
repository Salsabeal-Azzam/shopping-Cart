// import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Navbar from './pages/Navbar';
import Order from './pages/Order';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import OrderTest  from './pages/OrderTest';


function App ()
{

  // const [items ,itemsState] = useState([]);
  // useEffect(()=>{
  //    let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
  //    if (dataLocal!=null) {
  //        itemsState(dataLocal);
  //    }
  // },[]);
  // const addToLocalStorage =(data)=>{
  //   localStorage.setItem("data-cart",JSON.stringify(data))

  // };

  // //add in cart function
  // const addItem = (item)=>{
  //   let exist = items.find((elm)=>elm._id === item._id);
  //   if (exist) {
  //     let cart =items.map((elm)=>elm._id===item._id?{...exist,qty:exist.qty+1}:elm);
  //     itemsState(cart);
  //     // console.log(cart);
  //     console.log(items);
  //     addToLocalStorage(cart);
  //   }else{
  //     let itemAraay = [...items , {...item,qty:1}];
  //     itemsState(itemAraay);
  //     console.log(items);
  //     addToLocalStorage(itemAraay);
  //   }
  // };
  // // remove quonty in cart function
  // const removeItem = (item)=>{
  //   let exist = items.find((elm)=>elm._id === item._id);
  //   if (exist.qty > 1) {
  //     let cart =items.map((elm)=>elm._id===item._id?{...exist,qty:exist.qty-1}:elm);
  //     itemsState(cart);
  //     console.log(items);
  //     addToLocalStorage(cart)
  //   }else{
  //      removeProduct(item);
  //   }
  // };
  // //remove product cart function
  // const removeProduct = (item)=>{
  //     let cart = items.filter((elm)=>elm._id !== item._id);
  //     itemsState(cart);
  //     addToLocalStorage(cart)
  // };
  // const [totalQTY,totalQTYState] = useState(0);
  // const [totalPrice,totalPriceState] = useState(0);

  // useEffect(()=>{
  //   let arrayIteem = items;
  //   let totQ = arrayIteem.reduce((x,y) => x+y.qty,0);
  //   totalQTYState(totQ);
  //   let totPric= arrayIteem.reduce((x,y) => x+(y.price * y.qty),0);
  //   totalPriceState(totPric);
  // },[items]);
  return (
    <>
      <BrowserRouter>
       <Navbar />
       <Routes>
        <Route path='/' element={<Product/>} ></Route>
        <Route path='/cart' element={<Cart/>} ></Route>
        <Route path='/order' element={<Order/>} ></Route>
        <Route path='/wishlist' element={<Wishlist/>}></Route>
        <Route path='/orderTest' element={<OrderTest/>}></Route>
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
