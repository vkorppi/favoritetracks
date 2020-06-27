import mongoose, { Schema, Document } from 'mongoose';
import { UserSchemaType } from '../types';


const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: String },
  email: { type: String },
  address: { type: String }
});


userSchema.set('toJSON', {
  transform: (databaseObj: Document) => {
    databaseObj.id = databaseObj._id as string;
    delete databaseObj._id;
    delete databaseObj.__v;
  }
});

export default mongoose.model<UserSchemaType>('User', userSchema);