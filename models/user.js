'use strict';
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  });


	User.beforeCreate((user, options) => {
		console.log(user)
  	    const saltRounds = 10;
    	const myPlaintextPassword = user.password;	

		return bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
		    user.password = hash;
		});
	});


	User.beforeBulkUpdate((user,options) => {
  	    const saltRounds = 10;
    	const myPlaintextPassword = user.attributes.password;	

		return bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
		    user.attributes.password = hash;
		});
	});	

  return User;
};