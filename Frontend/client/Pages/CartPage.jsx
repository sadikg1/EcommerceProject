import React, { useState } from 'react'
import Layout from '../Component/Layout'
import { useCart } from '../src/Context/cartContext'
import { useAuth } from '../src/Context/auth'
import { useNavigate } from 'react-router-dom'
const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
 
  
    const navigate = useNavigate()
    //total price 
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
              total = total + item.price;
            });
            return total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
          } catch (error) {
            console.log(error);
          }
    }


    //const remove cart item
    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
          } catch (error) {
            console.log(error);
          }
        
    }
    const API_BASE_URL = import.meta.env.VITE_APP_URL;
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length >= 1 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login to checkout"}` : "Your Cart is empty"}</h4>
                    </div>
                  
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                        
                            {cart?.map(p => (
                                <>
                                    <div className="row card mb-2 flex-row">
                                        <div className="col-md-4 ">
                                            <img
                                                src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                                className="card-img-top"
                                                alt={p.name}
                                                width="200px"
                                                height={"300px"}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <p>{p.name}</p>
                                            <p>{p.description.substring(0, 30)}</p>
                                            <p>Price :$ {p.price}</p>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeCartItem(p._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="mt-2">
                            {auth?.token ? <button className='btn btn-primary'>Make Payment</button>:""}
                            
                        </div>
                    </div>
                </div>
            </div>
          
        </Layout>
    );
};

export default CartPage