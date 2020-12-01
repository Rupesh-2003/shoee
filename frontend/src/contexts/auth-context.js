import { createContext } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false, 
    login: ()=> {},
    logout: ()=> {},
    name: '',
    setName: ()=> {},
    mobile: '',
    setMobile: () => {},
    liked: [],
    setLiked: () => {},
    cart: [],
    setCart: () => {},
    warning: false,
    setWarning: () => {},
    removeWarning: () => {},
    buy: [],
    setBuy: () => {},
    yourOrders : [],
    setYourOrders: () => {}
});