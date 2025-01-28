import Product from "../model/product.model.js"
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
export const getAllProducts=async (req,res)=>{
    try {
        const products=await Product.find({}); //find all products
        res.json({products});
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const getFeaturedProducts=async(req,res)=>{
    try {
       let featuredProducts= await redis.get("featured_products");
       if(featuredProducts){
           return res.json(JSON.parse(featuredProducts))
       }

       //if not in redis,fetch from mongodb
       //.lean() is gonna return a plain javacript object instea of a mongodb document
       //which is good for performance
       featuredProducts=await Product.find({isFeatured:true}).lean();
       if(!featuredProducts){
        return res.status(404).json({message:"No featured products found"});
       }

       //store in redis for future quick access

       await redis.set("featured_products",JSON.stringify(featuredProducts));
       res.json(featuredProducts);
    } catch (error) {
       res.status(500).json({message:"Server error",error:error.message})
    }
}

export const createProduct=async (req,res)=>{
    try {
        const {name,description,price,image,category}=req.body;
        let cloudinaryResponse=null;
        if(image){
            cloudinaryResponse= await cloudinary.uploader.upload(image,{folder:"prodcuts"})
        }

        const product=await Product.create({
            productName:name,
            description,
            price,
            image:cloudinaryResponse?.secure_url?cloudinaryResponse.secure_url:"",
            category
        })
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}

export const deleteProduct=async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        if(product.image){
           const publicId=product.image.split("/").pop().split(".")[0];//this will get the id of the image id
           try {
            await cloudinary.uploader.destroy(`products/${publicId}`);
            console.log("delete image from cloudinary")
           } catch (error) {
            console.log("error deleteing image from cloudinary",error);
           }
        }

        await product.findByIdAndDelete(req.params.id);
        res.json({message:"Product deleted Successfully"});
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

export const getRecomendedProducts=async(req,res)=>{
    try {
        const products=await Product.aggregate([
            {
                $sample:{size:3}
            },
            {$project:{
                _id:1,
                name:1,
                description:1,
                image:1,
                price:1
            }}
        ]);
        res.json(products);
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

export const getProductsCategory= async (req,res)=>{
    const {category}=req.params;
    try {
        const products=await Product.find({category});
        res.json(products);
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
};

export const toggleFeaturedProducts=async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(product){
            product.isFeatured=!product.isFeatured;
            const updateProduct=await product.save();
            await updateFeaturedProductCache();
            res.json(updateProduct);
        }else{
            res.status(404).json({message:"product not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

async function updateFeaturedProductCache(){
    try {
        const featuredProducts=await Product.find({isFeatured:true}).lean();
        await redis.set("featured_products",JSON.stringify(featuredProducts));
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}