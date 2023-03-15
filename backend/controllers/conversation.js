import conversationModel from "../model/conversation.model.js";
import { createError } from "../utils/error.js";

export const createConversation = async (req, res, next) => {
  try {
    const newConversation = new conversationModel({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      //blessing is seller while tunde which is false is buyer
      sellerId: req.isSeller ? req.userId : req.body.to, //1234
      buyerId: req.isSeller ? req.body.to : req.userId, //abcde
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });
    const savedConvo = await newConversation.save();
    res.status(201).send(savedConvo);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await conversationModel.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );
    res.status(200).send(conversations).sort({ updatedAt: -1 });
  } catch (error) {
    next(error);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await conversationModel.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "not found"));
    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConvo = await conversationModel.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readBySeller: true,
          readByBuyer: true,
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConvo);
  } catch (error) {
    next(error);
  }
};
