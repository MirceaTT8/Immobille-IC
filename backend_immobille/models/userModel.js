const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema} = require("mongoose");
const {ObjectId} = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
      name:{
            type: String,
            required: [true, "Please add a name"],
        },
      email: {
            type: String,
            required: [true, "Please add a email"],
            unique: true,
            trim: true,
            match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please enter a valid email",
            ],
          },
      password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be up to 6 characters"],
            //   maxLength: [23, "Password must not be more than 23 characters"],
          },
      phoneNumber: {
        type: String,
      },
      properties: [{
            type: Schema.Types.ObjectId,
            ref: 'Property'
          }],
      savedAnnouncements: [{
          type: Schema.Types.ObjectId,
          ref: 'Property'
      }]
    });


userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
      return next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
