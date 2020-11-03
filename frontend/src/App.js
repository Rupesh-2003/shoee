import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import HomePage from './Pages/Home-Page'
import CartPage from './Pages/Cart-Page'
import LikedPage from './Pages/Liked-Page'
import SignupPage from './Pages/SignUp-Page'
import LoginPage from './Pages/Login-Page'
import Verificationpage from './Pages/Verification-Page'
import ParticularProduct from './Pages/ParticulatProduct-Page'
import AboutPage from './Pages/About-Page'
import YourOrderPage from './Pages/YourOrders-Page'
import ChekoutPage from './Pages/Checkout-Page'
import { AuthContext } from './contexts/auth-context'

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setUserName] = useState("")
  const [mobile, setMobile] = useState(0)
  const [liked, setLikedlist] = useState([])
  const [cart, setCartList] = useState([])
  const [warning, changeWarning] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setCartList([])
    setLikedlist([])
    setMobile(0)
  }, []);

  const setName = useCallback((name) => {
    setUserName(name)
  }, []);

  const setMobileNumber = useCallback((mobile) => {
    setMobile(mobile)
  }, [])

  const setLiked = useCallback((array) => {
    setLikedlist(array)
  }, [])

  const setCart = useCallback((array) => {
    setCartList(array)
  }, [])

  const setWarning = useCallback((message) => {
    changeWarning(message)
  }, [])

  const removeWarning = useCallback(() => {
    changeWarning(false)
  }, [])
  
  let routes ;  

  if(isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/about" exact>
          <AboutPage/>
        </Route>
        <Route path="/checkout" exact>
          <ChekoutPage/>
        </Route>
        <Route path="/yourOrders" exact>
          <YourOrderPage/>
        </Route>
        <Route path="/:page" exact>
          <HomePage/>
        </Route>
        <Route path="/product/:productId" exact>
          <ParticularProduct/>
        </Route>
        <Route path="/home/cart" exact>
          <CartPage/>
        </Route> 
        <Route path="/home/liked" exact>
          <LikedPage/>
        </Route>
      </Switch>
    )
  }
  else {
    routes = (
      <Switch>
        <Route path="/:mobile/verification" exact>
          <Verificationpage/>
        </Route>
        <Route path="/product/:productId" exact>
          <ParticularProduct/>
        </Route>
        <Route path="/login" exact>
          <LoginPage/>
        </Route>
        <Route path="/signup" exact>
          <SignupPage/>
        </Route>
        <Route path="/about" exact>
          <AboutPage/>
        </Route>
        <Route path="/:page" exact>
          <HomePage/>
        </Route>
        <Redirect to="/signup" exact/>
      </Switch>
    )
  }

  return (
    
    <AuthContext.Provider
      value={{ 
        isLoggedIn: isLoggedIn, 
        login: login, 
        logout: logout,
        name: name,
        setName: setName,
        mobile: mobile, 
        setMobile: setMobileNumber, 
        liked: liked, 
        setLiked: setLiked,
        cart: cart,
        setCart: setCart,
        warning: warning,
        setWarning: setWarning,
        removeWarning: removeWarning }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
    
  )
}

export default App;
