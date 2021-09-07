const router = require("express").Router();
const db = require("../../models");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

// getLastWorkout()
// GET - /api/workouts
router.get("/workouts", (req, res) => {
    // db.Workout.find({
    //     exercises: {
    //         $exists: true,
    //         $not: {$size: 0}
    //     }
    // })

    db.Workout.aggregate([
        {$match : {
            exercises : {
                $exists: true,
                $not : {
                    $size : 0
                }
            }
        }},
        {$sort : {
            day : -1
        }},
        {$limit : 1},
        {$project :{
            _id : 0,
            day : 1,
            exercises : 1,
            totalDuration : { $sum: "$exercises.duration"}
        }}
    ])
    .then( workoutdata => {
        res.json(workoutdata);
    })
    .catch( err => {
        res.json(err);
    });
});

// addExercise(data)
// (Body has exercise info)
// PUT - /api/workouts/:id
router.put("/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id : new ObjectId(req.params.id) },
        { $push:
            { exercises : req.body }
        },
        { new: true }
    )
    .then( newExerciseData => {
        res.json(newExerciseData);
    })
    .catch( err => {
        res.json(err);
    });
});

// createWorkout(data = {})
// (Body has workout info / empty workout / return ID?)
// POST - /api/workouts
router.post("/workouts", (req, res) => {
    db.Workout.create({
        _id: mongoose.Types.ObjectId(),
        day: new Date(),
        exercises: [] 
    })
    .then( newWorkoutData => {
        console.log(newWorkoutData._id);
        res.json( newWorkoutData );
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    });
});

// getWorkoutsInRange()
// ('range' is not a variable)
// GET - /api/workouts/range
router.get("/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {$match : {
            exercises : {
                $exists: true,
                $not : {
                    $size : 0
                }
            }
        }},
        {$sort : {
            day : -1
        }},
        {$limit : 7},
        {$project :{
            _id : 0,
            day : 1,
            exercises : 1,
            totalDuration : { $sum: "$exercises.duration"}
        }}
    ])
    .then( aggData => {
        res.json(aggData);
    })
    .catch( err => {
        res.json(err);
    });
});

module.exports = router;