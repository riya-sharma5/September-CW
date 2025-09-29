import mongoose, { Schema } from "mongoose";
const movieSchema = new Schema({}, { strict: false, collection: 'movies' });
const movieModel = mongoose.model("movies", movieSchema);
export default movieModel;
//# sourceMappingURL=sample_mflix.js.map