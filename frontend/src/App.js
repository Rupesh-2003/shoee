import React, { useState } from 'react';
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
  
  const [warning, setWarning] = useState(false)

  let routes ;  

  if(JSON.parse(sessionStorage.getItem('isLoggedIn'))) {
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
      value={{ warning: warning, setWarning: setWarning}}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
    
  )
}

export default App;
