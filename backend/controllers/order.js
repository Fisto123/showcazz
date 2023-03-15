import gigModel from "../model/gig.model.js";
import orderModel from "../model/order.model.js";
import Stripe from "stripe";
export const Intent = async (req, res) => {
  const stripe = new Stripe(
    "sk_test_51LMTFCBggtccEOr5cZZ52IoXxorG12tPwZBVgUHDatCBNORFEQcvMatBGiMKQE5BhqmY8z5GP0NhdKyD3utpmJAS008CjK8RaP"
  );
  const gig = await gigModel.findById(req.params.id);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newOrder = new orderModel({
    gigId: gig._id,
    image: gig.coverImage,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });
  await newOrder.save();
  res.status(200).send({ clientSecret: paymentIntent.client_secret });
};
// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await gigModel.findById(req.params.gigId);
//     const newOrder = new orderModel({
//       gigId: gig._id,
//       image: gig.coverImage,
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: "temporary",
//     });
//     await newOrder.save();
//     res.status(200).send("success");
//   } catch (error) {
//     next(error);
//   }
// };

export const getOrder = async (req, res, next) => {
  try {
    const orders = await orderModel.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await orderModel.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
