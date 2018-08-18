// Import Mongoose
const mongoose = require( 'mongoose' );

// Blog schema
const blogSchema = mongoose.Schema({

  title: String,
  content: String,
  author: {
    firstName: String,
    lastName: String
  }
});

// Create a virtual property for the author's full name
// This will be used in the 'serialized' versions (instances) of the documents that are returned to users of the API
blogSchema.virtual( 'authorFullName' ).get( function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogSchema.methods.serialize = function() {
  return {
    title: this.title,
    content: this.content,
    author: this.authorFullName
  };
}; 

// Blog model based on blogSchema
const Blog = mongoose.model( 'Blog', blogSchema );

// Export the model
module.exports = { Blog };