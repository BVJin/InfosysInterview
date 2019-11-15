'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Car Schema
 */
var InfosysUserSchema = new Schema({
	username: {
        type: String,
		required: [true, 'User name is required']
	},

	password: {
		type: String,
		required: [true, "Password is required"]
	}
},
{
  timestamps: true
});


mongoose.model('InfosysUser', InfosysUserSchema);
