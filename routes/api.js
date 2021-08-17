const router = require("express").Router();
const db = require("../models/workout.js");

// POST workout new workout
router.post("/api/workouts", ({ body }, res) => {
  db.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// All workouts
// get last workout
router.get("/api/workouts", (req, res) => {
	db.find()
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});
// need another get request 



router.get("/api/workouts", (req, res) => {
  db.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
  

module.exports = router;  
            


   
