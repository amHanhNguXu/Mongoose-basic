var express = require('express');
var router = express.Router();
var Food = require('../models/foodModel');

// get list foods
router.get('/list_all_foods', (request, response, next) => {
   // response.end('Get request => list_all_foods');
   Food.find({}).limit(100).sort({name: 1}).select({
      name: 1,
      foodDescription: 1,
      created_date: 1,
      status: 1
   }).exec((err, foods) => {
      if (err) {
         response.json({
            result: 'false',
            data: [],
            message: `Error is: ${err}`
         });
      } else {
         response.json({
            result: "ok",
            data: foods,
            count: foods.length,
            message: "Query list of foods successlly"
         });
      }
   })
});

//get food by id
router.get('/get_food_by_id', (request, response, next) => {
   console.log(request.query.food_id);
   Food.findById(require('mongoose').Types.ObjectId(request.query.food_id),
      (err, food) => {
         if (err) {
            response.json({
               result: 'false',
               data: [],
               message: `Error is: ${err}`
            }); 
         } else {
            response.json({
               result: "ok",
               data: food,
               message: "Query food of foods successlly"
            });
         }
      });
});


// get list with find
router.get('/list_foods_with_criteria', (request, response, next) => {
   let criteria = {
      name: new RegExp(request.query.name, "i"),
   };
   const limit = parseInt(request.query.limit) > 0 ? parseInt(request.query.limit) : 100;
   Food.find(criteria).limit(limit).sort({name: 1}).select({
      name: 1,
      foodDescription: 1,
      created_date: 1,
      status: 1
   }).exec((err, foods) => {
      if (err) {
         response.json({
            result: 'false',
            data: [],
            message: `Error is: ${err}`
         });
      } else {
         response.json({
            result: "ok",
            data: foods,
            count: foods.length,
            message: "Query list of foods successlly"
         });
      }
   })
})

// insert food
router.post('/insert_new_food', (request, response, next) => {
   const newFood = new Food({
      name: request.body.name,
      foodDescription: request.body.foodDescription
   });
   newFood.save((err) => {
      if (err) {
         response.json({
            result: 'failed',
            data: {},
            message: `Error is :  ${err}`
         });
      } else {
         response.json({
            result: "ok",
            data: {
               none: request.body.none,
               foodDescription: request.body.foodDescription,
               message: "Insert new food successfully"
            }
         });
      }
   })
});

router.put('/update_a_food', (request, response, next) => {
   request.end('Put request => update a food');
});

router.delete('/delete_a_food', (request, response, next) => {
   response.end('Delete requested => delete_a_food');
});
module.exports = router;