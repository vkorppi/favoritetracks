import mongoose, { Schema, Document } from 'mongoose';
import { TrackSchemaType } from '../types/favoritesTypes';

const trackSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    spotifUri: { type: String, required: true },
    users:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ]
  });


  trackSchema.set('toJSON', {
    transform: (databaseObj: Document) => {
      databaseObj.id = databaseObj._id as string;
      delete databaseObj._id;
      delete databaseObj.__v;
    }
  });

  export default mongoose.model<TrackSchemaType>('Track', trackSchema);