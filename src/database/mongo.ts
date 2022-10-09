import {connect} from 'mongoose';
import environmentKeys from '../constants/tech/environmentKeys';
import logger from '../utils/logger';

export const connectToMongoDb = async () => {
  await connect(environmentKeys.MONGO_URL).catch(err => logger.error(err, "Mongodb error connection"))
}
