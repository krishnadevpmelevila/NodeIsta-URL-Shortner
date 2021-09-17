const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');

const router = express.Router();
const Url = require('../models/UrlModel');

const baseUrl = process.env.baseUrl || 'http://localhost:5000';

router.post('/shorten',async(req,res)=>{
    const{
        longUrl
    }=req.body
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('We are not operating now. As my admin is an idiot.')
    }
    const urlCode = shortId.generate()
    
    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({
                longUrl
            })
            if(url){
                res.json(url)
            }else{
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date:new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json("Something Went wrong. Don't worry it is our problem")
        }
    }
    else{
        res.status(401).json('Please check the URL entered')
    }
    
})
module.exports = router