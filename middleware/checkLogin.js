const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config()

function isSignin(req,res, next) {
	jwt.verify(req.headers.token, process.env.SECRET_KEY , (err, decoded) => {
		if(err){
			res.send("wrong token")	
		}else{
			req.headers.admin = decoded.isAdmin;
			req.headers.id = decoded.id;
			next()
		} 
	})
}

function authentication(req,res, next) {
	if(req.headers.admin == true || req.headers.id == req.params.id){
			next()
		}else{
			res.send("unauthorized")
	}
}

module.exports = {
	isSignin,
	authentication
}