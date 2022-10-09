import logger from "../../../utils/logger";
import { SolicitationSchema, Solicitation } from "../entities/SolicitationSchema";


class SolicitationRepository {
  static async create({name, status, subject}: ISolicitationDTO): Promise<void> {
    await SolicitationSchema.create({name, status, subject}).catch(err => {
      logger.error(err, "Failed to create solicitation")
    });
    return
  }

  static async list(): Promise<Solicitation[]> {
    const solicitation = await SolicitationSchema.find();
    return solicitation;
  }

  static async findById(_id:String): Promise<Solicitation[]> {
    const solicitation = await SolicitationSchema.findById(_id);
    return solicitation;
  }
  
  static async update(_id:String, status:String): Promise<void> {
    const solicitation = await SolicitationSchema.findByIdAndUpdate({'_id': _id}, {"status": status});
    return solicitation;
  }
}



export { SolicitationRepository }