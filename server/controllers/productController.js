// function for add product

import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../config/cloudinary.js"; 
import productModel from "../models/productModel.js";

// Call this function at the start of your application
connectCloudinary();

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
  
    const image1 = req.files.image1 ? req.files.image1[0] : null;
const image2 = req.files.image2 ? req.files.image2[0] : null;
const image3 = req.files.image3 ? req.files.image3[0] : null;
const image4 = req.files.image4 ? req.files.image4[0] : null;

console.log('Uploaded files:', req.files);
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image", 
        });
        console.log('Cloudinary Upload Result:', result);        
        return result.secure_url;
      })
    );

    const productData={
      name,
      description,
      category,
      price:Number(price),
      subCategory,
      bestseller:bestseller==='true'?true:false,
      sizes: JSON.parse(sizes),
      image:imageUrl,
      date:Date.now()
    }

    console.log(productData);

    const product=new productModel(productData);

    await product.save()


    // Here you might want to add the code for saving the product to your database
    res.json({ success: "true", message: "Product added successfully!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product

const listProduct = async (req, res) => {
  try {
    const products=await productModel.find({});
    res.json({success:true,products})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
};
// function for removing product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product removed"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
};
// function for single product information

const singleProduct = async (req, res) => {
  try {
    const{productId}=req.body;
    const product = await productModel.findById(productId);
    res.json({success:true,product})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
  }
};

export { listProduct, addProduct, removeProduct, singleProduct };
