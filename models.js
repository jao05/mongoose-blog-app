// Import Mongoose
const mongoose = require( 'mongoose' );

// Use ES6 promises in Mongoose
mongoose.Promise = global.Promise;

// Author schema
const authorSchema = mongoose.Schema({
  firstName: String;
  lastName: String,
  userName: {
    type: String,
    unigue: true
  }
});

// Comment schema
const commentSchema = mongoose.Schema({ content: 'string'});

// Blog schema
const blogSchema = mongoose.Schema({

  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  comments: [ commentSchema ]
});

// Pre-hook to populate author property prior to returning documents for a 'find' query
blogPostSchema.pre('find', function(next) {
  this.populate('author');
  next();
});

// Pre-hook to populate author property prior to returning documents for a 'findOne' query
blogPostSchema.pre('findOne', function(next) {
  this.populate('author');
  next();
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
    author: this.authorFullName,
    comments: this.comments,
    id: this._id
  };
}; 

// Author model based on authorSchema
const Author = mongoose.model( 'Authors', authorSchema );

// Blog model based on blogSchema
const Blog = mongoose.model( 'Blogposts', blogSchema );

// Export the model(s)
module.exports = { Author, Blog };