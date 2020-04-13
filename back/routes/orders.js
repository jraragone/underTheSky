const express = require("express");
const router = express.Router();
const Order = require("../models/order")
const User = require("../models/user")
const ProductData = require("../models/productData")


router.post("/addOrder",function(req,res){
    User.findByPk(req.user.id)
        .then((user)=>{
            ProductData.findByPk(req.body.productDataId)
            .then((productData)=>{
                Order.findOrCreate({
                    where:{
                            userId:req.user.id,
                            status:req.body.status,
                            address:req.body.address,
                            postCode:req.body.postCode,
                            transactionNumber:req.body.transactionNumber,
                            city:req.body.city,
                            country:req.body.country,
                            state:req.body.state
                    }
                }).spread(function(order,created){
                    productData.setOrder(order)
                    res.json(order)
                })
            })
        })
    })
                   
   router.post("/modifyOrder",function(req,res){
       console.log("BODY:",req.body)
        Order.findByPk(req.body.orderId)
        .then(order=>{
            ProductData.findByPk(req.body.productDataId)
            .then(productData=>{
                User.findByPk(req.body.userId)
                .then(user=>{
                    order.setUser(user)
                    productData.setUser(user)
                })
                productData.setOrder(order)
                res.json({
                    order:order,
                    productData:productData
                })
            })
        })
    })   
    
    router.get("/userOrders",(req,res)=>{
        Order.findAll({
            where:{
                userId:req.user.id
        }}).then(orders=>{
            ProductData.findAll({
                where:{
                    userId:req.user.id
                }
            }).then(productData=>{
                res.send({
                    orders:orders,
                    productData:productData
                })
            })
        })
    })
       


                
           
                





                
                
    
                   
                
                    


module.exports= router