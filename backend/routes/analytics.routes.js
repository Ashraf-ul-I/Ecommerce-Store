import express from 'express';
import { adminRoute, protectRoute } from '../middlewares/auth.middleware';
import { getAnalysisData, getDailySalesData } from '../controllers/analytics.controller';

const router=express.Router();

router.get('/',protectRoute,adminRoute, async(req,res)=>{
    try {
        const analyticsData= await getAnalysisData();
        
        const endDate= new Date();
        const startDate= new Date(endDate.getTime()-7*24*60*60*1000); //7 days back from the present date end date

        const dailySalesData=await getDailySalesData(startDate,endDate);
        res.json({
            analyticsData,
            dailySalesData
        })
        
    } catch (error) {
        console.log("Error in analytics route",error.message);
        res.status(500).jaon({message:"Server Error",error:error.message});
    }
})

export default router;