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
    },
    description:{
        type: String,
        required:true
    },
    added_by:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:[
            'open',
            'closed'
        ],
        default:'open'
    },
    retrieved:{
        type:Boolean,
        defualt:false
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
        description:'text'
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;