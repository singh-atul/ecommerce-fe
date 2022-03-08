import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import AccountDetails from "./pages/AccountDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/common.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					exact
					path="/home"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Home />
						</Suspense>
					}
				/>
				 <Route
					exact
					path="/"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Login />
						</Suspense>
					}
				/>
				{/* <Route
					exact
					path="/account"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<AccountDetails />
						</Suspense>
					}
				/> */}

				<Route
					exact
					path="/cart"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Cart />
						</Suspense>
					}
				/>

				<Route
					exact
					path="/checkout"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Checkout />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/products"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<ProductList />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/product/:productid/details"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<ProductDetails />
						</Suspense>
					}
				/> 
			</Routes>
		</Router>
	);
}

export default App;
