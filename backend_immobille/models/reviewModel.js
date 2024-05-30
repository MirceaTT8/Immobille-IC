const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    reviewer: {
      type: String,
      required: [true, "Please add a reviewer's name"]
    },
    text: {
      type: String,
      required: [true, "Please add a review text"],
      minLength: [10, "Review text must be at least 10 characters long"]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
