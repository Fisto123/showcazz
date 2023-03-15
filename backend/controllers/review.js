import gigModel from "../model/gig.model.js";
import Review from "../model/reviews.model.js";
import { createError } from "../utils/error.js";
export const createReview = async (req, res, next) => {
  try {
    if (req.isSeller)
      return next(createError(403, "seller cant create review"));
    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review) return next(createError(403, "review already cretaed"));
    const savedReview = await newReview.save();
    await gigModel.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    return res.status(201).send(savedReview);
  } catch (error) {
    createError(error);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      gigId: req.params.gigId,
    });
    res.status(200).send(reviews);
  } catch (error) {
    next(createError(error));
  }
};
export const deleteReviews = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).send("deleted successfulluy");
  } catch (error) {
    next(createError(error));
  }
};
