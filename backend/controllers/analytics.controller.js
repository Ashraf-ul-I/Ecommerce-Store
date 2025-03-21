import Order from "../model/order.model";
import Product from "../model/product.model";
import User from "../model/user.model"

export const getAnalysisData =async (req,res)=>{
    const totalUsers= await User.countDocuments();
    const totalProducts= await Product.countDocuments();

    const salesData= await Order.aggregate([
        {
            $group:{
                _id:null , //it groups all document together
                totalSales:{$sum:1}, //count the total order in database
                totalRevenue:{$sum:"$totalAmount"}
            }
        }
    ])

    const {totalSales,totalRevenue} =salesData[0] || {totalSales:0,totalRevenue:0}

    return {
        users:totalUsers,
        products:totalProducts,
        totalSales,
        totalRevenue
    }
}

export const getDailySalesData = async(startDate,endDate)=>{
   try {
    const dailySalesData= await Order.aggregate([
        {
            $match:{
                createdAt:{
                    $gte:startDate,
                    $lte:endDate,
                }
            }
        },
        {
            $group:{
                _id:{$dateToString :{format:"%Y-%m-%d",date:"$createdAt"}},
                sales:{$sum:1},
                revenue:{$sum:"$totalAmount"}
            }
        },
        {
            $sort:{_id:1}
        }
    ])
    const dateArray= getDatesInRange(startDate,endDate);

    return dateArray.map(date=>{
        const foundDate=dailySalesData.find(item=>item._id===date);

        return {
            date,
            sales:foundDate?.sales || 0,
            revenure:foundDate?.revenue || 0
        }
    })
   } catch (error) {
    throw error
   }
}

function getDatesInRange(startDate,endDate){
    const dates=[];
    let currentDate= new Date(startDate);

    while(currentDate<=endDate){
        dates.push(currentDate.toISOString().split("T")[0])
        currentDate.setDate(currentDate.getDate()+1);
    }

    return dates
}