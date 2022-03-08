import React, { useState } from "react";
import axios from 'axios';
import '../styles/login.css';
import { Link } from "react-router-dom";

const BASE_URL = 'http://localhost:8080';

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const loginFn = () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        const data = {
            username: username.value,
            password: password.value
        };

        axios.post(BASE_URL + '/ecomm/api/v1/auth/signin', data)
            .then(function (response) {
                if (response.status==200) {
                    
                    localStorage.setItem("username", response.data.username)
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("token", response.data.accessToken);
                    window.location.href = "/home";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const signupFn = () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const email = document.getElementById("email");
        

        const data = {
            username: username.value,
            password: password.value,
            email: email.value
        };
        console.log(data);
        axios.post(BASE_URL + '/ecomm/api/v1/auth/signup', data)
            .then(function (response) {
                if (response.status==200) {
                    // localStorage.setItem("username", response.data.username)
                    // localStorage.setItem("userId", response.data.data.userId);
                    // localStorage.setItem("token", response.data.data.token);
                    window.location.href = "/";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup);
    }

    return (
        <div id="loginPage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/"}>Ecommerce</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="home-title text-center">Welcome to Ecommerce</h2>
                        {
                            !showSignup ? (
                                <div className="login-wrapper">
                                    <h4 className="text-center">Login</h4>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Username" id="username" />
                                    </div>
                                    <div className="input-group">
                                        <input type="password" className="form-control" placeholder="Password" id="password" />
                                    </div>
                                    <div className="input-group">
                                        <input type="submit" className="form-control btn btn-primary" value="Log in as User" onClick={loginFn} />
                                    </div>
                                    <div className="signup-btn text-center text-info" onClick={toggleSignup}>Dont have an Account ? Signup</div>
                                    <div className="auth-error-msg text-danger text-center"></div>
                                </div>
                            ) : (
                                <div className="login-wrapper">
                                    <h4 className="text-center">Signup</h4>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Username" id="username" />
                                    </div>
                                    <div className="input-group">
                                        <input type="password" className="form-control" placeholder="Password" id="password" />
                                    </div>

                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Email" id="email" />
                                    </div>
                                    
                                    <div className="input-group">
                                        <input type="submit" className="form-control btn btn-primary" value="Sign up as User" onClick={signupFn} />
                                    </div>
                                    <div className="signup-btn text-center text-info" onClick={toggleSignup}>Already have an Account ? Login</div>
                                    <div className="auth-error-msg text-danger text-center"></div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;