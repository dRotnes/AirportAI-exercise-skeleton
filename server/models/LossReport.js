const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    document_number:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    loss_description:{
        type: String,
        required: true
    },
    loss_time:{
      type:Date,
      required:true
    },
    status:{
      type:String,
      enum:[
          'open',
          'closed - product retrieved',
          'closed - expired'
      ],
      default:'open'
    }
  },
  { timestamps: true }
);

reportSchema.index(
    { 
        loss_description:'text'
    }
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;