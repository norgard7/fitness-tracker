const router = require("express").Router();
const db = require("../models/workout.js");

// aggregate code 
router.post("/api/workouts", (req, res) => {
  db.create({})
      .then((workout) => {
          res.json(workout)
      })
      .catch((err) => {
          res.json(err)
      })
});
router.get("/api/workouts", (req, res) => {
  db.aggregate([
      {
          $addFields: {
              totalDuration: {
                  $sum: '$exercises.duration'
              },
          },
      },
  ])
      .then((workout) => {
          res.json(workout)
      })
      .catch((err) => {
          res.json(err)
      })
});

router.put("/api/workouts/:id", (req, res) => {
  // console.log('PARAMS', req.params)
  db.findByIdAndUpdate(
      req.params.id,
      { $push: { exercise: req.body } },
      { new: true, runValidators: true }
  )
      .then((workout) => {
          res.json(workout)
      })
      .catch((err) => {
          res.json(err)
      })
});
router.get(`/api/workouts/range`, (req, res) => {
  db.aggregate([
      {
          $addFields: {
              totalDuration:
                  { $sum: '$exercises.duration' },
              totalWeight:
                  { $sum: '$exercises.weight' }
          }
      }
  ])
      .limit(10)
      .then((workout) => {
          res.json(workout)
      })
      .catch((err) => {
          res.json(err)
      })
});
module.exports = router;  
            


  //  original code

// // POST workout new workout
// router.post("/api/workouts", ({ body }, res) => {
//   db.create(body)
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// // All workouts
// // get last workout
// router.get("/api/workouts", (req, res) => {
// 	db.find()
// 		.then((dbWorkout) => {
// 			res.json(dbWorkout);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// router.put("/api/workouts/:id", ({body, params}, res) => {
//   db.findByIdAndUpdate(params.id, {$push: 
//   {excerises: body}})
//   .then((dbWorkout) => {
//     res.json(dbWorkout);
//   })
//   .catch((err) => {
//     res.json(err);
//   });
// })


// router.get("/api/workouts", (req, res) => {
//   db.find({})
//     .sort({ date: -1 })
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/workouts/range", (req, res) => {
//   db.find({})
//     .sort({ date: -1 })
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });
