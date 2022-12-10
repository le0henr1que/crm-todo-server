import { model, Document, Schema } from 'mongoose';


export interface User extends Document {
  // _id:String;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const schema = new Schema<User>({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
});


export const UserSchema = model<User>('User', schema);