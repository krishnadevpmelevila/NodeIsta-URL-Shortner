const express = require('express');
const router = express.Router();
const Url = require('../models/UrlModel')

router.get('/:code',async(req,res)=>{
    try{
        console.log(req.params.code);
        const url = await Url.findOne({
            urlCode:req.params.code
        })
        if(url){
            return res.redirect(url.longUrl)
        }else{
           
            return res.status(404).json("Are you sure? We can't find this URL !")
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('We have something wrong at our end. Can you please come after some time? We are fixing it! ')
    }
})
module.exports = router