const express = require('express');


function isAdmin(req,res, next) {
	if(req.headers.admin){
		next()
	}else {
		res.send("not admin")
	}
}

module.exports = {
	isAdmin,
}