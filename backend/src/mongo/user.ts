
import mongoose, { Document } from 'mongoose';
import typeparsers from '../utils/typeparsers';

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String

});

userSchema.set('toJSON', {
    transform: ( document:Document) => {
      const id:number = typeparsers.parseNumber(document._id,'id was not a number');
      document.id = id.toString();
      delete document._id;
      delete document.__v;
    }
  })