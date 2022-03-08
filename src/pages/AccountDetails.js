import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/accountDetails.css';

const BASE_URL = 'http://localhost:8080';

function AccountDetails() {
    const [username, setUsername] = useState('User');
    const [showUsername, setShowUsername] = useState(localStorage.getItem("username"));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const logoutFn = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('token')

        window.location.href = "/";
    }

    useEffect(() => {
        const data = {
            // userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        };
        setUsername(localStorage.getItem("username"));
        setShowUsername(localStorage.getItem("username"));
        axios.post(BASE_URL + '/api/v1/user/details', data)
            .then(function (response) {
                if (response.data.success) {
                    setName(response.data.userDetails.name);
                    setEmail(response.data.userDetails.email);
                    setPhone(response.data.userDetails.phone);
                    setAddress(response.data.userDetails.address);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const updateUserDetailsFn = () => {
        setErrorMsg('');
        setSuccessMsg('');
        const data = {
            name,
            email,
            phone: '',
            address,
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem("token")
        }
        if (phone.length > 0) {
            const phoneno = /^\d{10}$/;
            if (!phoneno.test(phone)) {
                setErrorMsg('Phone number is invalid')
            } else {
                data.phone = phone;
                updateUserDetails(data);
            }
        } else {
            updateUserDetails(data);
        }
    }

    const updateUserDetails = (data) => {
        axios.post(BASE_URL + '/api/v1/user/edit', data)
            .then(function (response) {
                if (response.data.success) {
                    setSuccessMsg('Successfully Updated');
                } else {
                    setErrorMsg('Error in updating account details')
                }
            })
            .catch(function (error) {
                console.log(error);
                setErrorMsg('Error in updating account details');
            });
    }

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePhone = (e) => {
        setPhone(e.target.value);
    }

    const updateAddress = (e) => {
        setAddress(e.target.value);
    }

    return (
        <div id="accountDetailsPage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/home"}>Ecommerce</Link>
                            </div>
                            <div className="user-actions d-flex flex-row">
                                <Link className="text-decoration-none" to={"/account"}>Account</Link>
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
                    <div className="col-4">
                        <h2 className="home-title mb-5">Acccount Details</h2>
                        <div className="mb-4">
                            <label htmlFor="username" className="form-label fw-bold">Username</label>
                            <input type="text" className="form-control" id="username" defaultValue={showUsername} disabled />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label fw-bold">Name</label>
                            <input type="text" className="form-control" id="name" defaultValue={name} onChange={updateName} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                            <input type="email" className="form-control" id="email" defaultValue={email} onChange={updateEmail} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
                            <input type="text" className="form-control" id="phone" defaultValue={phone} onChange={updatePhone} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="form-label fw-bold">Address</label>
                            <textarea className="form-control" id="address" rows="3" onChange={updateAddress} defaultValue={address}></textarea>
                        </div>
                        <div className="save-btn btn btn-primary mb-5" onClick={updateUserDetailsFn}>Save Changes</div>
                        <div className="save-error text-danger mb-5">{errorMsg}</div>
                        <div className="save-success text-success mb-5">{successMsg}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountDetails;