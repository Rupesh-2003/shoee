const bcrypt = require('bcrypt')
const fast2sms = require('fast-two-sms')

const Signup = require('../models/signup')
const Verification = require('../models/verification')

const signup = async (req, res, next) => {

    const { name, mobile, password } = req.body 

    let isMobileUsed
    try{
        isMobileUsed = await Signup.findOne({mobile : mobile})
    } catch(err) {
        console.log(err)
    }

    if(isMobileUsed) {
        res.status(400).json({message: 'Mobile number already used.'})
        return
    }

    let hashedPass = ''
    try {
        hashedPass = await bcrypt.hash(password, 10)
    } catch(err) {
        console.log(err)
    }

    const newUser = new Signup({
        name,
        mobile,
        password: hashedPass,
        liked: [],
        cart: []
    })

    var min = 1000;
    var max = 9999;
    var num = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log("one time pass : "+num)

    const message = num +" is your verification code for activating your shoe account. This message was intended for "+name 
    try {
        await fast2sms.sendMessage({ authorization: process.env.SMS_KEY, message: message, numbers: [mobile] })
    } catch (err)  {
        console.log(err)
    }
    
    let isMobileInVerification
    try{
        isMobileInVerification = await Verification.findOne({ mobile: mobile})
    } catch(err) {
        console.log(err)
    }

    if(isMobileInVerification) {
        isMobileInVerification.remove()
    }
    
    const newVerification = new Verification({
        mobile,
        otp : num,
        user : newUser
    })

    try{
        await newVerification.save()
    } catch(err) {
        console.log(err)
    }

    res.status(200).json({message : 'Verify your number.'})
       
}

const login = async (req, res, next) => {
    
    const { mobile, password } = req.body

    let isMobileRegistered
    try {
        isMobileRegistered = await Signup.findOne({ mobile : mobile })
    } catch (err) {
        console.log(err)
    }
    
    if(!isMobileRegistered) {
       res.status(400).json({message: 'No Account Registered with this Number!'})
       return
    }

    try {
        if(await bcrypt.compare(password, isMobileRegistered.password)) {
            res.status(200).json({message: 'Logged In', name: isMobileRegistered.name})
            return 
        }
        else {
            res.status(400).json({message: 'Wrong Password'})
            return
        }
    } catch(err) {
        console.log(err)
    }

}

const verification = async (req, res, next) => {
    const { mobile, otp } = req.body

    let isMobileTryingToSignUp
    try {
        isMobileTryingToSignUp = await Verification.findOne({ mobile : mobile })
    }catch(err) {
        res.status(401).json({message: 'Wrong Mobile Number'})
        return
    }
    
    if(!isMobileTryingToSignUp) {
        res.status(401).json({message: 'Wrong Mobile Number'})
        return
    }   

    try{
        if(otp == await isMobileTryingToSignUp.otp) {
            try {
                const newUser = new Signup(await isMobileTryingToSignUp.user)
                isMobileTryingToSignUp.remove()
                await newUser.save()
                res.status(200).json({message : 'Verification Success', name: isMobileTryingToSignUp.user.name})
            } catch(err) {
                console.log(err)
            }
        }
        else {
            isMobileTryingToSignUp.remove()
            res.status(401).json({message : 'Wrong OTP'}) 
            return
        }
    } catch(err) {
        console.log(err)
    }
  
}

const addToLiked = async (req, res, next) => {
    const { mobile, productId } = req.body

    const User = await Signup.findOne({ mobile: mobile })
    
    if(!User) {
        res.status(400).json({message: "No Such User found!!!"})
        return
    }
    
    try {
        await User.liked.push(productId)
        User.save()
        res.status(200).json({message: "Successfully added to Liked!!!"})
        return
    }catch(err) {
        console.log(err)
    }

    res.status(400).json({ message: "failed" })
}

const removeFromLiked = async (req, res, next) => {
    const { mobile, productId } = req.body

    const User = await Signup.findOne({ mobile: mobile })

    if(!User) {
        res.status(400).json({message: "No Such User found!!!"})
        return
    }

    try {
        await User.liked.remove(productId)
        User.save()
        res.status(200).json({message: "Successfully removed from liked"})
        return
    }catch(err) {
        console.log(err)
    }

    res.status(400).json({ message: "failed" })
}
const listOfLikedProducts = async (req, res, next) => {
    const { mobile } = req.body

    const User = await Signup.findOne({ mobile: mobile })

    if(!User) {
        res.status(400).json({message: "No Such User found!!!"})
        return
    }

    let likedProductList
    try {   
        likedProductList = User.get('liked')
        res.status(200).json({ likedProducts: likedProductList })
        return
    } catch(err) {
        console.log(err)
    }
    
    res.status(400).json({message: "Failed to return list"})
}

const addToCart = async (req, res, next) => {
    const { mobile, userCartProduct } = req.body

    const User = await Signup.findOne({ mobile: mobile })

    if(!User) {
        res.status(400).json({message: "No Such User found!!!"})
        return
    }

    try {
        await User.cart.push(userCartProduct)
        User.save()
        res.status(200).json({ message: "Successfully added to cart." })
    } catch(err) {
       console.log(err)
    }
}

const removeFromCart = async (req, res, next) => {
    const { mobile, productId } = req.body

    const User = await Signup.findOne({ mobile: mobile })

    if(!User) {
        res.status(400).json({ message: "No Such User found!!!" })
        return
    }

    try {
        await User.updateOne({$pull: {'cart' :{productId : productId}}})
        User.save()
        res.status(200).json({ message: "Successfully removed from cart." })
        return
    } catch(err) {
        console.log(err)
    }
    res.status(400).json({ message: "failed" })
}

const listOfCartProducts = async (req, res, next) => {
    const { mobile } = req.body

    const User = await Signup.findOne({ mobile : mobile })

    if(!User) {
        res.status(400).json({ message: "No Such User found!!!" })
        return
    }

    try {
        const cartProductsList = User.get('cart')
        res.status(200).json({ cartProducts : cartProductsList })
        return
    } catch(err) {
        console.log(err)
    }

    res.status(400).json({message: "Failed to return list"})
}

const changeSize = async (req, res, body) => {
    const { mobile, productId, size } = req.body

    try{
        await Signup.update(
            {mobile : mobile, 'cart.productId': productId},
            {$set: {'cart.$.size': size}}
        )
        res.status(200).json({ message: "changed size!!!"})
    } catch(err) {
        console.log(err)
    }

}

exports.signup = signup
exports.login = login
exports.verification = verification
exports.addToLiked = addToLiked
exports.removeFromLiked = removeFromLiked
exports.listOfLikedProducts = listOfLikedProducts
exports.addToCart = addToCart
exports.removeFromCart = removeFromCart
exports.listOfCartProducts = listOfCartProducts
exports.changeSize = changeSize