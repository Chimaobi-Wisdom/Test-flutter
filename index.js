const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  const user = {
    name: "dev",
    username: "riz",
    email: "devriz2030@gmail.com",
    number: process.env.MY_NUMBER,
  };
  const public_key = process.env.PUBLIC_KEY;
  res.render("index", { user, public_key });
});

app.get("/start", (req, res) => {
  // console.log(req.query);
  res.render("loading");
});

app.get("/redirect_flutterewave", async (req, res) => {
  const { transaction_id } = req.query;
  // console.log(transaction_id);
  // URL with transaction ID of which will be used to confirm transaction status
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
  const secret_key = process.env.SECRET_KEY;
  // Network call to confirm transaction status
  axios({
    url,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${secret_key}`,
    },
  })
    .then((response) => {
      console.log(response.data.data.customer);
      //  const email = response.data.data.customer.email

      //save validated responce to database

      // check for user via the mail in customer

      //update users wallet balance
      res.redirect("/start");
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log(`app is running at port:${port}`));
