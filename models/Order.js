const {model,Schema} = require('mongoose');


const OrderSchema = new Schema({
    orderId :{type : String, required : true},
    vandorId : {type : String, required : true},
    items : [
        {
            food :{ type : Schema.Types.ObjectId , ref : "food", required : true},
            unit : {type : Number, required : true}
        }
    ],
    totalAmount : {type : Number, required : true},
    orderDate : {type : Date},
    paidThrough : {type : String},
    paymentResponse : {type : String},
    orderStatus : {type : String},
    remarks :{type : String},
    deliveryId : {type : String},
    appliedOffers : {type : Boolean},
    offerId : {type : String},
    readyTime : {type : Number} // max 60 minutes
},{
    toJSON : {
        transform(doc,ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
     timestamps : true
});



module.exports = model('order',OrderSchema);
