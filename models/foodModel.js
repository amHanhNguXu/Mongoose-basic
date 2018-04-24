var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create Schema
var FoodSchema = new Schema({
    name: {
        type: String,
        required: true // require not null
    },
    foodDescription: {
        type: String,
        default: ""
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            emur: ['avaiable', 'unavaiable']
        }],
        default: ['avaiable']
    }
});
// a setter
FoodSchema.path('name').set( (inputString) => {
    return inputString[0].toUpperCase() + inputString.slice(1);
});
module.exports = mongoose.model('Food', FoodSchema);