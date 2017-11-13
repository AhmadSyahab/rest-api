const User   = require('../models').User;
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

require('dotenv').config()

function getAllUser(req,res) {
	User.findAll()
		.then(allUser => {
			res.send(allUser);
		})
			.catch(err => {
				res.send(err);
			})
}

function createUser(req,res) {
	User.create({
		username : req.body.username,
		password : req.body.password,
		isAdmin  : req.body.isAdmin	
	})
		.then((data) => {
			res.send(data);
		})
			.catch(err => {
				res.send(err);
			})
}

function deleteUser(req,res) {
	User.destroy({
		where : {
			id : req.params.id
		}
	})
		.then(() => {
			res.send(`User ${req.params.id} Deleted`);
		})
			.catch(err => {
				res.send(err);
			})
}

function getOneUser(req,res) {
	User.findOne({
		where : {
			id : req.params.id
		}
	})
		.then((user) => {
			res.send(user);
		})
			.catch(err => {
				res.send(err);
			})
}

function updateUser(req,res) {

	User.update({
		username : req.body.username,
		password : req.body.password,
		isAdmin  : (req.headers.admin == true) ? req.body.isAdmin : false
	},{
		where : {
			id : req.params.id
		}
	})
		.then(() => {
			res.send(`User ${req.params.id} Updated `);
		})
			.catch(err => {
				res.send(err);
			})
}

function signIn(req,res) {
	User.findOne({
		where : {
			username : req.body.username
		}
	})
		.then(user => {
			if(user){
				bcrypt.compare(req.body.password, user.password)
					.then(result => {
						if(result){
							jwt.sign({
							id : user.id,
							username : user.username,
							isAdmin : user.isAdmin
							}, process.env.SECRET_KEY , (err, token) => {
								res.send({user, message : "login success", token: token})
							})
						}else{
							res.send("wrong password")
						}
					})
					.catch((err) => {
						res.send("wrong password")
					})
			}else{
				res.send("wrong username")
			}
		}).catch(err => {
			res.send("wrong username")
		})
}

function signUp(req,res) {
	User.create({
		username : req.body.username,
		password : req.body.password,
		isAdmin  : false
	})
		.then((data) => {
			res.send(data);
		})
			.catch(err => {
				res.send(err);
			})
}

module.exports = {
	getAllUser,
	createUser,
	deleteUser,
	getOneUser,
	updateUser,
	signIn,
	signUp
}