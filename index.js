const express = require("express");
const handleError = require("./middlewares/error")
const cors = require("cors");
const userRouter = require("./routes/user-route");
const productRouter = require("./routes/product-route");
const authentication = require("./middlewares/authentication")
require('dotenv').config();



const app = express();
app.use(express.json());
app.use("/user",userRouter );
app.use("/checkout", (req, res) => {
  res.json({ message: "hello checkout" });
});
app.use("/order", authentication,(req,res) => {
  res.json({ message: "hello order" });
});
app.use("/product",productRouter );
app.use(handleError)

app.listen(3000, () => console.log("server running on port 3000"));