const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    product_name: {
        type: String,
        required: true,
    },
    product_category:{
        type:String,
        enum:[
            'Cellphone',
            'Clothing',
            'Eletronics',
            'Jewellery',
            'Books',
            'Documents',
            'Passport',
            'Other'
        ],
        required:true,
    },
    product_brand:{
        type:String
    },
    product_color:{
        type:String
    },
    product_country:{
        type:String
    }
  },
  { timestamps: true }
);

productSchema.index(
    { 
        product_name: 'text', 
        product_category: 'text', 
        product_brand: 'text', 
        product_color:'text', 
        product_country:'text',
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;