// Import Express
const express = require("express");

// Import Mongoose
const mongoose = require("mongoose");

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
// ************FINISH ONCE THE MODEL HAS BEEN CREATED*********

// Instantiate an Express app
const app = express();

// Use JSON is this app
app.use(express.json());

// GET
// Create a 'virtual' for the author's name string & 
// serialize objects that are to be returned to API user
app.get( '/posts', function( req, res )
				   {

				   } 

);

// GET by ID
app.get( '/posts/:id', function( req, res )
				   {

				   } 

);

// POST (CREATE)
app.post( '/posts', function( req, res )
				   {
				   	
				   } 

);

// PUT (UPDATE)
app.put( '/posts/:id', function( req, res )
				   {
				   	
				   } 

);

// DELETE
app.delete( '/posts/:id', function( req, res )
				   {
				   	
				   } 

);
