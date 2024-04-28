import { TryCatch } from "../middlewares/error.js"
import { Response,Request,NextFunction} from "express"
import { NewProductRequestBody } from "../types/types.js"
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct=TryCatch(async(req:Request<{},{},NewProductRequestBody>,res:Response,next:NextFunction)=>{
    const {name,category,price,stock}=req.body;

    const photo =req.file;

    if(!photo) return next(new ErrorHandler("Please add a Photo",400))

    if(!name || !category || !price || !stock) 
        {
            rm(photo.path,()=>{
                console.log("deleted");
            })
            return next(new ErrorHandler("Please enter all field",400))
        }

    await Product.create({
        name,
        price,
        stock,
        category:category.toLowerCase(),
        photo:photo.path,
    });

    return res.status(201).json({
        success:true,
        message:"Product Created Successfully",

    })
})


export const getLatestProducts=TryCatch(async(req,res,next)=>{

    const products=await Product.find({}).sort({createdAt:-1}).limit(5);
    
    return res.status(201).json({
        success:true,
        products,

    })
})


export const getAllCategories=TryCatch(async(req,res,next)=>{

    const categories=await Product.distinct("category");
    
    return res.status(201).json({
        success:true,
        categories,

    })
})



export const getAdminProducts=TryCatch(async(req,res,next)=>{

    const products=await Product.find({});
    
    return res.status(201).json({
        success:true,
        products,

    })
})

export const getSingleProduct=TryCatch(async(req,res,next)=>{
    
    const product=await Product.findById(req.params.id);
    if(!product) return next(new ErrorHandler("Product not found",404));
    
    return res.status(201).json({
        success:true,
        product,

    })
})

export const updateProduct=TryCatch(async(req,res,next)=>{
    const {id}=req.params;
    const {name,category,price,stock}=req.body;

    const photo =req.file;
    const product =await Product.findById(id);
    if(!product) return next(new ErrorHandler("Product not found",404));

    if(!product) return next(new ErrorHandler("Invalid Product Id",404));

    if(photo){
            rm(product.photo!,()=>{
                console.log("old photo deleted");
            })
            product.photo = photo.path
            
        }
    
    if(name) product.name=name;
    if(price) product.price=price;
    if(stock) product.stock=stock;
    if(category) product.category=category;

    await product.save();
    return res.status(200).json({
        success:true,
        message:"Product updated Successfully",

    })
})

export const deleteProduct=TryCatch(async(req,res,next)=>{
    
    const product=await Product.findById(req.params.id);
    if(!product) return next(new ErrorHandler("Product not found",404));

    rm(product.photo!,()=>{
        console.log("product photo deleted");
    })

    await product.deleteOne();

    return res.status(201).json({
        success:true,
        message:"Product updated Successfully",

    })
})