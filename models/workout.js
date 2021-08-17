const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
      },
    exercises: [{
      type: {
        type: String,
        trim: true,
        required: "Enter an exercise type"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter an exercise name"
      },
      duration : {
        type : Number,
        required : "Please Enter Exercise duration"
      },
      weight: {
        type : Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      },
    },
  ],
},
{
  // For reference on virtuals with json: https://mongoosejs.com/docs/2.7.x/docs/virtuals.html - when data is called, this will include any virtual properties.
  // The toJSON() method converts a Date object into a string, formatted as a JSON date. For reference: https://www.w3schools.com/jsref/jsref_tojson.asp
  toJSON: {
    virtuals: true
  }
}
);

// dynamic schema referencing totalDuration which is found in the workout.js file contained in the public folder
workoutSchema.virtual("totalDuration").get(function () {
// cannot use arrow function on account of the .this property referencing exercises
// reduce() to handle limiting the array of exercises down to their duration totals
return this.exercises.reduce((total, exercise) => {
  return total + exercise.duration;
}, 0);
});



const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;


