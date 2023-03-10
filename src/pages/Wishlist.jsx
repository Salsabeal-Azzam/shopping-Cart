
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddItemToCart from './../components/AddItemToCart';
import { BiTrash } from "react-icons/bi";



const Wishlist = () => {

    const sorcImag = 'http://localhost:3000/api/v1/image';

    const [items ,itemsState] = useState([]);

    // const token = localStorage.getItem('user-token');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDYwZDY1NTMyNGI0MjFmYjEzZjYwMSIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODM5NTI1NCwiZXhwIjoxNjc4NDgxNjU0fQ.tRjCgzftPlJU96-Hw8J1kQCbDqXCQC85Ocygrilf4Ow";
    function displayData(){
        
        axios.get("http://localhost:3000/api/v1/user/whishlist/",{headers:{
            'authorization':`Bearer ${token}`
        }}).then((res)=>{
            console.log(res);
           let {data} = res;
           if (data.message === "Done") {
            itemsState(data.wishListProducts);
           } 
         if (res.data.message === "Sorry your product in wishList is deleted") {
            itemsState([])
         }
        }).catch((err)=>{
            console.log(err);
        })
    };
 
    useEffect(()=>{
        displayData();
     },[]);

    const removeProduct =(product)=>{
        axios.patch(`http://localhost:3000/api/v1/user/unWhishlist/${product._id}`,{},{headers:{
            'authorization':`Bearer ${token}`
        }}).then((res)=>{
           let {data} = res;
           console.log(data);
           if (data.message === "Done , remove from wishList") {
            displayData();
           }
        }).catch((err)=>{
         console.log(err);
        })
    }
    
  return (
    <>
     
     <div className="container my-5 shadow-lg p-3 mb-5 bg-white rounded py-5 ">

          <h2 className='cartItems my-3 text-center pt-5 px-5'>Wishlist</h2>
          {items.length === 0?<h5 className='text-center h2'>Wishlist is empty</h5>:''}
          {items && items.map((item,index)=>(
                      <div  key={index} className='row py-3'>
                         <div className=" offset-md-1 col-md-3">
                             <img className='w-100' src={`${sorcImag}${item.photos[0]}`} alt=""/>
                         </div>
                       <div className="col-md-5 offset-md-1 d-flex align-items-center">
                        <div className="w-50 text-center">
                           <h6>{item.product_name}</h6>
                           <p className='price'>{item.price}EL</p>
                           <div className=" d-flex align-items-center">
                           <AddItemToCart removeProduct={removeProduct} item={item}/>
                           <button onClick={()=>{removeProduct(item)}} className="btn btn-danger ms-3"><BiTrash/></button>
                           </div>
                        </div>

                      </div>
                  </div>
          ))}
          <div className="row">
          <div className="offset-md-8 col-md-3 mt-5">
              <Link to='/' className="btn btn-info w-75">Back to store</Link>
            </div>
          </div>
      </div>  
    
    </>
  )
}

export default Wishlist