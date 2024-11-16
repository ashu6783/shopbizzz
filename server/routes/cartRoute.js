import express from "express"
import { adddToCart,getUserCart,updateCart } from "../controllers/cartController.js"
import authUser from "../middleware/auth.js"

const cartRouter= express.Router()

cartRouter.post('/get',authUser, getUserCart)
cartRouter.post('/add',authUser,adddToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter