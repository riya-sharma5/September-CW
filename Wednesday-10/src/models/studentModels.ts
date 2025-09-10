import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

  rollno:
   {
     type: Number,
      required: true,
       unique: true
       },

  name:
   {
     type: String, 
     required: true
     },

  collegeName:
   {
     type: String, 
     required: true 
    },

  course:
   {
     type: String,
      required: true
     },
  password:
   { type: String, required: true },
});

const StudentModel = mongoose.model("Student", studentSchema);

export{StudentModel};
