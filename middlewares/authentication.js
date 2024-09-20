const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(createError(401, "Unauthorized"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      return next(createError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};