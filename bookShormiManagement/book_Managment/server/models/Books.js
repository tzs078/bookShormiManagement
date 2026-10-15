const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a book title'],
    trim: true,
    minlength: [1, 'Title cannot be empty']
  },
  author: {
    type: String,
    required: [true, 'Please add an author name'],
    trim: true,
    minlength: [1, 'Author cannot be empty']
  },
  status: {
    type: String,
    enum: {
      values: ['unread', 'read'],
      message: 'Status must be either "unread" or "read"'
    },
    default: 'unread'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Transform _id to id and remove versionKey (__v) for JSON responses as per Specification
bookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

module.exports = mongoose.model('Book', bookSchema);