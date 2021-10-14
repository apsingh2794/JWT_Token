const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const child = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  tokens: [{
    token: {
      type: String,
    },
  }]
});

child.methods.generateAuthToken = async function () {
  try {
    // console.log(this._id);
    const token = jwt.sign({_id: this._id.toString()},"aaveshlaiufafaeuilfeuifgweruifgiweosingh");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    res.send("this is ERROR: " + err);
    console.log("this is ERROR: " + err);
  }
};

module.exports = mongoose.model("User_Details", child);
