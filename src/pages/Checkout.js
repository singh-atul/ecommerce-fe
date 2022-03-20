import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/checkout.css';

const BASE_URL = 'http://localhost:8080';

function Checkout() {
    const [orderDetails, setOrderDetails] = useState({});
    const [confirmPaymentSuccess, setConfirmPaymentSuccess] = useState(false);
    const [username, setUsername] = useState('User');

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        const data = {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        };
        const cartId=localStorage.getItem("cartId");
        axios.get(BASE_URL + '/ecomm/api/v1/carts/'+cartId, {
            params: data,
            headers: {
                'x-access-token': localStorage.getItem("token")
              }
        })
            .then(response=>{
                setOrderDetails(response.data);
            }).catch(function (error) {
                console.log(error);
        });

        
    }, []);

    const confirmPayment = () => {
        const data = {
            orderId: orderDetails.orderId,
            userId: localStorage.getItem('userId'),
            payment: true,
            token: localStorage.getItem("token")
        };
        setConfirmPaymentSuccess(true);
        // axios.post(BASE_URL + '/api/v1/order/edit', data)
        //     .then(function (response) {
        //         if (response.data.success) {
        //             setConfirmPaymentSuccess(true);
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    const logoutFn = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('token')

        window.location.href = "/";
    }

    return (
        <div id="checkoutPage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/home"}>Ecommerce</Link>
                            </div>
                            <div className="user-actions d-flex flex-row">
                                {/* <Link className="text-decoration-none" to={"/account"}>Account</Link> */}
                                <Link className="text-decoration-none" to={"/cart"}>Cart</Link>
                                <div className="user-intro">Hi {username}</div>
                                <div className="logout-btn" onClick={logoutFn}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="cart-title">Checkout</div>
                    <div className="cart-wrapper d-flex flex-row">
                        <div className="order-details d-flex flex-column">
                            <div className="order-details-title fw-bold">Order Summary</div>
                            {
                                orderDetails.productsSelected && orderDetails.productsSelected.map((product) => (
                                    <div className="order-details-product d-flex flex-row" key={product.id}>
                                        <div className="order-details-product-img d-flex">
                                            <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
                                        </div>
                                        <div className="order-details-product-data d-flex flex-column">
                                            <div>{product.name}</div>
                                            <div>₹ {product.cost}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="price-details d-flex flex-column">
                            <div className="price-details-box">
                                <div className="price-details-title fw-bold">Price Details</div>
                                <div className="price-details-data">
                                    <div className="price-details-item d-flex flex-row justify-content-between">
                                        <div>Price</div>
                                        <div>₹ {orderDetails.cost}</div>
                                    </div>
                                    <div className="price-details-item d-flex flex-row justify-content-between">
                                        <div>Discount</div>
                                        <div>₹ 0</div>
                                    </div>
                                    <div className="price-details-item d-flex flex-row justify-content-between">
                                        <div>Delivery Charges</div>
                                        <div>FREE</div>
                                    </div>
                                    <div className="price-details-item d-flex flex-row justify-content-between">
                                        <div>Total</div>
                                        <div>₹ {orderDetails.cost}</div>
                                    </div>
                                </div>
                            </div>
                            {
                                confirmPaymentSuccess ? (
                                    <div>
                                        <div className="confirm-payment-success-msg">Order Confirmed</div>
                                        <Link
                                            to="/home"
                                            className="btn btn-info continue-shopping-btn"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="confirm-payment-btn btn btn-primary" onClick={confirmPayment}>Confirm Payment</div>
                                )
                            }
                            <div className="confirm-payment-error-msg text-danger"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;