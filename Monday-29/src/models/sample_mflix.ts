import mongoose, { Schema } from "mongoose";

const movieSchema: Schema = new Schema({}, { strict: false, collection: 'movies' });

const movieModel = mongoose.model("movies", movieSchema);
export default movieModel;


