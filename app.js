const express = require("express");
const app = express();
const port = process.env.PORT || 3011;
require("./server/database");
const Register = require("./server/register");
const bcrypt = require("bcryptjs");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 app.get("/", (req, res) => {
  res.render("registration");
});
 app.get("/registration", (req, res) => {
  res.render("registration");
});

app.get("/login", (req, res) => {
  res.render("login");
});
 



// REGISTRATION POST
app.post("/registration", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
 
      if (password === confirmpassword) {
        const registerEmployee = new Register({
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          confirmpassword: req.body.confirmpassword,
        });
        const token = await registerEmployee.generateAuthToken();

        var register = await registerEmployee.save();
        res.redirect("login");
      } else {
        console.log("Password Not Match...");
        res.send("Password Not Match.");
      }
     
  } catch (error) {
    res.send(error);
  }
});


app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email });

    const isMatch = await bcrypt.compare(password, userEmail.password);

    // if (password=== userEmail.password) {
    if (isMatch) {
      console.log("success....");
      // res.status(201).render("registration");
      res.send("User name found in Database");
    } else {
      res.send("Email & Password are wrong");
      console.log("Email & Password are wrong.");
    }
  } catch (err) {
    console.log(err);
    res.send("Email & Password are wrong (err)");
  }
});



// LOGIN11 POST
app.post("/login11", async (req, res) => {
  try {
     
    popup.alert({
      content: 'Hello!'
  });
  } catch (err) {
    console.log(err);
  }
});


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
