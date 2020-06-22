import mongoose, { Schema } from 'mongoose';
import { UserSchemaType } from '../types';


const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true }
});

export default mongoose.model<UserSchemaType>('User', userSchema);