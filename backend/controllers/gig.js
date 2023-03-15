import Gig from "../model/gig.model.js";
import { createError } from "../utils/error.js";
export const createGig = async (req, res, next) => {
  console.log(req.isSeller);
  if (!req.isSeller)
    return next(createError(403, "only sellers can create gigs"));
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(200).send(savedGig);
  } catch (error) {
    next(error);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig"));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted");
  } catch (error) {
    return next(error);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "gig not found"));
    const singleGig = await Gig.findById(req.params.id);
    res.status(200).send(singleGig);
  } catch (error) {
    return next(error);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: { $regex: q.cat, $options: "i" } }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
  };
  try {
    const Gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(Gigs);
  } catch (error) {
    return next(error);
  }
};
