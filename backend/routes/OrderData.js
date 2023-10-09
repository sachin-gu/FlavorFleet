const express = require('express');
const router = express.Router()
const Order = require('../models/Orders')

router.post('orderData', async (req,res) =>{
    let data = req.body.order_data 
    await data.splice(0,0 {Order_date: req.body.order_date})

    //if email not existing in db then create else insertMAny()
    let eId = await Order.findOne({ 'email': req.body.email})
    console.log(eId);
    if (eid === null){
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() =>{
                res.json({success: true})
            })
        } catch (error) {
            console.log(error.message);
            req.setEncoding("Server Error" , error.message)
            
        }
    }

    else{
        try {
            
        } catch (error) {
            
        }
    }
    
})