// Import Express
const express = require("express");

// Import Mongoose
const mongoose = require("mongoose");

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require("./config");
const { Blog } = require("./models");

// Instantiate an Express app
const app = express();

// Use JSON is this app
app.use(express.json());

// GET
// Create a 'virtual' for the author's name string & 
// serialize objects that are to be returned to API user
app.get( '/posts', function( req, res ) {

		Blog.find()    
		    // success callback: for each restaurant we got back, we'll
		    // call the `.serialize` instance method we've created in
		    // models.js in order to only expose the data we want the API return.    
		    .then(function(blogs) {
		      res.json({
		        blogs: blogs.map(blog => blog.serialize())
		      });
		    })
		    .catch(err => {
		      console.error(err);
		      res.status(500).json({ message: "Internal server error" });
		    });
	} 
);

// GET by ID
app.get("/posts/:id", (req, res) => {
  Blog
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .then(blog => res.json(blog.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// POST (CREATE)
app.post("/posts", (req, res) => {
  const requiredFields = ["title", "content", "author"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Blog.create({
    title: req.body.title,
    content: req.body.content,
    
    // **********How do we parse both the author's firstName & lastName???*********
    author: req.body.author    
  })
    .then(blog => res.status(201).json(blog.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

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
