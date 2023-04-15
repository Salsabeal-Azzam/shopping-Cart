import axios from "axios";
import { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Action_buttons from './../components/Action_buttons';

const Order = () => {

    const sorcImag = 'http://localhost:3000/api/v1/image';


    // item in cart
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

    // form 
    const [form, setForm] = useState({
      order_address:{
          city: "",
          street: "",
          building_num:0,
      },
      phone: "",
      payment_method:"",
      products:[]
  });
  const [formErrors, setFormErrors] = useState({});
  let [phoneErrors, setPhoneErrors] = useState(null);
  let [cityErrors, setcityErrors] = useState(null);
  let [streetErrors, setStreetErrors] = useState(null);
  let [bulidingNumErrors, setBulidingNumErrors] = useState(null);

  const UpdateAddress = e => {
      form.order_address.building_num = +form.order_address.building_num;
      const {name,value} = e.target;
      if (formErrors) {
        var faildError  = formErrors;

      }
      if (name === 'city') {
        setcityErrors(null)
        faildError.order_address.city = null;
        setFormErrors(faildError)
      }
      if (name === 'street') {
        setStreetErrors(null)
        faildError.order_address.street = null;
        setFormErrors(faildError);
      }
      if (name === 'building_num') {
        setBulidingNumErrors(null);
        faildError.order_address.building_num = null;
        setFormErrors(faildError);

      }

      setForm((prev) => {
          return {
              ...prev,order_address: {
                  ...prev.order_address,
                  [e.target.name]: e.target.value
              }
          }
      })
  }
  const onUpdateField = e => {
      const { name, value } = e.target;
      const nextFormState = { ...form, [name]: value };
      setForm(nextFormState);
      let faildError  = formErrors;
      faildError.phone = null;
      setPhoneErrors(null);
      setFormErrors(faildError)
  };

  const checkPhone = e =>{
    console.log(e.target);
    const phonenum = /^\d{11}$/;
    const {name,value} = e.target;
    if ( value == '') {
        setPhoneErrors("phone is required")
    } else if (!phonenum.test(value)) {
        setPhoneErrors("phone is not vaild");
    }else{
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
        setPhoneErrors(null)
    }
  }

  const checkAdreess = e =>{
    console.log(e.target);
    const {name,value} = e.target;
    if (name === 'city') {
        if ( value == '') {
            setcityErrors("city is required")
        }
    }else if (name === 'street'){
        if ( value == '') {
            setStreetErrors("street is required")
        }
    }else if (name === 'building_num'){
        if ( value == 0) {
            setBulidingNumErrors("Building_num is required")
        }
    }

  }


  const validate = (val) => {
      const errors = {
        order_address:{
            city:"",
            street:"",
            building_num:""
  
        }
      };
      if (!val.payment_method) {
          errors.payment_method = "payment_method is required"
      }

      if (!val.order_address?.city) {
        errors.order_address.city = "city is required"
       }
    if (!val.order_address?.street) {
        errors.order_address.street = "street is required"
    }
    if (!val.order_address?.building_num) {
        errors.order_address.building_num = "building_num is required"
    }
      if (!val.phone) {
        errors.phone = "phone is required"
      }

      return errors;
  }
  const getDataForm = ()=>{
     getData();
     let product = {};
     for (let i = 0; i < items.length; i++) {
       product.product_id = items[i]._id;
       product.quantity = items[i].qty;
       product.unitPrice = items[i].price;
       form.products.push(product);
     }
  }
  const clearCart = ()=>{
    localStorage.setItem('data-cart',JSON.stringify([]));
    itemsState([]);
    window.dispatchEvent(new Event('storage'));
  }

  // const token = localStorage.getItem('user-token');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDYwZDY1NTMyNGI0MjFmYjEzZjYwMSIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3OTMzMDUwMiwiZXhwIjoxNjc5NDE2OTAyfQ.09d3JqkRNi_BMmImxiCCBIDcnTfyiFmhgdIeTbJkBpM";

  const navigate= useNavigate();

  const onSubmitForm = e => {
      e.preventDefault();
      getDataForm();
      form.order_address.building_num = +form.order_address.building_num;
      setFormErrors(null)
      setFormErrors(validate(form))
      let errorBella = validate(form);
      console.log(errorBella);
      let errorB = 0;
      for (const key in errorBella) {
        console.log(`${key} : ${errorBella[key]}`);
        if (key == 'order_address') {
            for (const item in key) {
                    if (key[item]) {
                        errorB++;
                    }
            }
        }else if (errorBella[key]) {
            errorB++;
        }
      }

      if (errorB){
        console.log(errorB);
        alert("please enter vaild data")

      }else{
        console.log("bellla not error");
        const cofrimOrder = window.confirm("Cofrim Order");
        if (cofrimOrder === true) {
          if(form.payment_method === "Cash"){
            axios.post('http://localhost:3000/api/v1/order/create', form,{headers:{
              'authorization':`Bearer ${token}`
              }}).then((res) => {
                console.log(res);
                alert("Sucess Creat Your Order");
                clearCart();
                navigate('/');
              }).catch((err) => {
                console.log(err.response.data.message)
            });
          }else{
             alert("Visssssa")
          }
        }
  
      }

  };

    
  return (
    <>
     
     <div className="conatiner mt-5 pb-5">
            <div className="row justify-content-center">


                <div className=" col-md-6  p-5 rounded shadow">
                    <form className='mb-5' onSubmit={onSubmitForm}>
                        <div className=" row my-2">
                            <div className="form-group col-md-12">
                                <label className='my-2' htmlFor="phone">Phone</label>
                                <input type="text" name="phone" className="form-control" id="phone" placeholder="phone" value={form.phone} onChange={onUpdateField} onBlur={checkPhone}/>
                                <div className=" text-danger">
                                    {phoneErrors || formErrors.phone}
                                </div>
                             </div>
                            <div className="form-group col-md-12">
                                <label className='my-2' htmlFor="city">City</label>
                                <input type="text" name="city" className="form-control" id="city" placeholder="city" value={form.order_address.city} onChange={UpdateAddress} onBlur={checkAdreess}/>
                                   <div className=" text-danger">
                                        {cityErrors || formErrors.order_address?.city}
                                   </div>
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <label className='my-2' htmlFor="street">street</label>
                            <input type="text" name="street" className="form-control" id="street" placeholder="street" value={form.order_address.street} onChange={UpdateAddress} onBlur={checkAdreess}/>
                               <div className=" text-danger">
                                        {streetErrors || formErrors.order_address?.street}
                                </div>
                        </div>
                        <div className="row mb-4">

                            <div className="form-group col-md-12">
                                <label className='my-2' htmlFor="building_num">Building_num</label>
                                <input type="number" className="form-control" name="building_num" id="building_num" placeholder="building_num" value={form.order_address.building_num} onChange={UpdateAddress} onBlur={checkAdreess} />
                                <div className=" text-danger">
                                        {bulidingNumErrors || formErrors.order_address?.building_num}
                                </div>
                            </div>
                        </div>
                        <div className="">
                        <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="cash" name="payment_method" value="Cash" onChange={(e) => setForm((prev) => ({ ...prev, payment_method: e.target.value }))} />
                                <label className="form-check-label" htmlFor="cash">Cash</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="visa" name="payment_method" value="Visa" onChange={(e) => setForm((prev) => ({ ...prev, payment_method: e.target.value }))} />
                                <label className="form-check-label" htmlFor="visa">Visa</label>
                            </div>
                            {formErrors.payment_method &&<div class="text-danger">
                                {formErrors.payment_method}
                            </div>
                            }
                        </div>


                       <div className=''>
                            <button type="submit" className="btn btn-primary m-2 px-l-5 px-3 ">save and deliver</button>
                            <button type="submit" className="btn btn-danger m-3 px-l-5 px-4 "><Link className="text-decoration-none text-white" to='/'>cancle</Link></button>
                       </div>


                    </form>
                 

                </div>

                <div className=" ms-5  col-lg-3 col-md-5 ">
                    <div className="card p-4 w-100">
                        <h4 className='p-1 ms-2 text-center'>your Orders</h4> <hr/>
                        {items && items.map((item,index)=>(
                        <div key={index} className="card-body text-center">
                            <img className="card-img-top img-fluid w-50" src={`${sorcImag}${item.photos[0]}`} alt="Card image cap"/>
                            <h6>{item.product_name}</h6>
                            <p className='price'>{item.price}EL</p>
                            <Action_buttons item={item}/>
                        </div>
                        ))}

                          <p className="text-white text-center btn btn-dark mt-5 mx-auto  w-50">Total:{totalPrice} EGP</p>
                     </div>

                </div>
            </div>
        </div>

    
    </>
  )
}

export default Order