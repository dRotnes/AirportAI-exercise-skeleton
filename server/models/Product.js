const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    product_name: {
        type: String,
        required: true,
    },
    added_by:{
        type:String,
        required:true,
    },
    description:{
        type: String,
        required:true
    },
    retrieved:{
        type:Boolean
    },
    retrieval_date:{
        type:Date
    }
  },
  { timestamps: true }
);

// // Hash the password before saving it to the database
// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

//   try {
//     user.salt = crypto.randomBytes(16).toString('hex');
//     user.password = crypto.pbkdf2Sync(user.password, this.salt,
//         1000, 64, `sha512`).toString(`hex`);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// // Compare the given password with the hashed password in the database
// userSchema.methods.comparePassword = async function (password) {
//   var hash = crypto.pbkdf2Sync(password,this.salt, 1000, 64, `sha512`).toString(`hex`);
//   return this.password === hash;
// };

const Product = mongoose.model('Product', productSchema);

module.exports = Product;