const express = require('express');
const router = express.Router();
const customerSchema=require('../Schemas/customerSchema')


router.post('/', async(req, res) => {
    try {
        const data=req.body;
        const newCustomer=customerSchema(data);
        const dataSave= await newCustomer.save();
        console.log('Data Saved Sucessfully');
        res.status(200).json(dataSave)
    } catch (error) {
        res.status(400).json({err:"Internal server error 1"})
    }
  })

  router.get('/:name', async(req, res) => {
    try {
        const nameUrl=req.params.name;
        const data=await customerSchema.find({name:nameUrl})
        console.log('Data Saved Sucessfully');
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({err:"Internal server error 1"})
    
    }
  })

  router.put('/:id', async(req, res) => {
    try {
        const nameUrl=req.params.id;
        const updateCustomerData=req.body;
        const update=await customerSchema.findByIdAndUpdate(nameUrl,updateCustomerData,{
            new :true,
            runValidators:true
        })
        if(!update){
            console.log('Data Not Updated');
            res.status(400).json({err:"Data not updated"})
        }
        console.log('Data Updated Sucessfully');
        res.status(200).json(update)
    } catch (error) {
        res.status(400).json({err:"Internal server error 3"})
    
    }
  })

  router.delete('/:id',async(req,res)=>{
    try {
        const nameUrl=req.params.id;
        const deletecCustomer=await customerSchema.findByIdAndDelete(nameUrl)
        if(!deletecCustomer){
            console.log('Data Not Deleted');
            res.status(400).json({err:"Data not Deleted"})
        }
        console.log('Data Deleted Sucessfully');
        res.status(200).json(deletecCustomer)
    } catch (error) {
        res.status(400).json({err:"Internal server error 4"})
    }
 })
 router.get('/home',function (req, res) {
    res.send('Hello World')
  })
  
 module.exports=router