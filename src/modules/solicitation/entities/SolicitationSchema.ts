import { model, Document, Schema } from 'mongoose';
import { status } from '../../../constants/solicitation';


export interface Solicitation extends Document {
  // _id:String;
  name: string;
  status: string;
  subject: string;
  created_at: Date;
  updated_at: Date;
}

const schema = new Schema<Solicitation>({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: Object.values(status),
    default: status.AGUARDANDO,
  },
  subject: {
    type: String,
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


export const SolicitationSchema = model<Solicitation>('Solicitation', schema);