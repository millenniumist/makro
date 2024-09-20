const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;
    if (!first_name || !last_name || !email || !phone || !password) {
      return createError(400, "All fields are required");
    }
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
      }, select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return createError(400, "All fields are required");
  }
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });
  if (!user) {
    return createError(404, "User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return createError(401, "Invalid username or password");
  }
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).json({
    message: "User logged in successfully", user: user.id,
    token
  });
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  // Implement update user profile logic
};

exports.deleteUser = async (req, res, next) => {
  // Implement delete user logic
};
