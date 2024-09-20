const express = require("express");
const handleError = require("./middlewares/error")
const cors = require("cors");
const userRouter = require("./routes/user-route");
const authentication = require("./middlewares/authentication")

const app = express();
app.use(express.json());
app.use("/user",userRouter );
app.use("/checkout", (req, res) => {
  res.json({ message: "hello checkout" });
});
app.use("/order", authentication,(req,res) => {
  res.json({ message: "hello order" });
});
app.use("/product", (req, res) => {
  res.json({ message: "hello product" });
});
app.use(handleError)

app.listen(3000, () => console.log("server running on port 3000"));