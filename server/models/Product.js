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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;