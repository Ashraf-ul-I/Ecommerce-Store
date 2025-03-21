import Product from "../model/product.model.js";

export const getCartProducts=async (req,res)=>{
    try {
        const products=await Product.find({_id:{$in:req.user.cartItems}});//because in user in cartItems we actually ref the Product id so we just check is the id is in user cartItems if has then get the items

        //addQuantity for each product
        const cartItems=products.map(product=>{
            //then from the product we get cartItems and then find each Item 
            //after that return quantity
            const item=req.user.cartItems.find(cartItem=>cartItem.id ===product.id);
            return {...product.toJSON(),quantity:item.quantity}
        })
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error",error:error.message})
    }
}
export const addToCart=async (req,res)=>{
    try {
        const {productId}=req.body;
        const user=req.user;

        const existingItem=user.cartItems.find(item=>item.id === productId);
        if(existingItem){
            existingItem.quantity +=1;
        }else{
            user.cartItems.push(productId);
        }
        await user.save();
        res.json(user.cartItems); 
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

export const removeAllFromCart=async (req,res)=>{
    try {
        const {productId}=req.body;
        const user=req.user;
        if(!productId){
           user.cartItems=[];
        }else{
            user.cartItems=user.cartItems.filter(item=>item.id !== productId);
        }
        await user.save();
        res.json(user.cartItems); 
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

export const updateQuantity=async(req,res)=>{
    try {
        const {id:productId}=req.params;
        const {quantity}=req.body;
        const user=req.user;
        const existingItem=user.cartItems.find(item=>item.id === productId);
        if(existingItem){
            if(quantity===0){
                user.cartItems=user.cartItems.filter(item=>item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }
        }
        //if the quantity is not zero then update the quantity and save the product
        existingItem.quantity=quantity;
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}