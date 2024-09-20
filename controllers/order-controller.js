const prisma = require("../config/prisma");


// exports.createOrder = async (req, res, next) => {
//   try {
//     const { userId,   } = req.body;
//     // Validate the request body
//     const order = prisma.order.create({
//       userId,
//       products,
//       ,
//     });
//     res.json({ message: "Order created successfully", order });
//   } catch (error) {
//     next(error);
//   }
// };

exports.getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(createError(400, "User ID is required"));
    }
    const orders = await prisma.order.findMany({
      where: {userId: userId},})
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};
