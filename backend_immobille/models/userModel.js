const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
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
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please enter a valid email",
            ],
          },
          password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be up to 6 characters"],
            //   maxLength: [23, "Password must not be more than 23 characters"],
          },
          
        });

        //encrypt pass before saving to Db
        userSchema.pre("save", async function(next) {
          if(!this.isModified("password")) {
              return next()
          }
          //Hash pass
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        })

        const User = mongoose.model("User", userSchema);
        module.exports = User;


          /*
          cartItems: {
            type: [Object],
          },
          isVerified: {
            type: Boolean,
            default: false,
          },
          stripeCustomerId: {
            type: String,
            // required: true,
          },
        },
        {
          timestamps: true,
        }
      );
      
      //   Encrypt password before saving to DB
      userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
          return next();
        }
      
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
      });
      
      const User = mongoose.model("User", userSchema);
      module.exports = User;
      */