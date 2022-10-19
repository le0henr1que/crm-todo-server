import logger from "../../../utils/logger";
import { SolicitationSchema, Solicitation } from "../entities/SolicitationSchema";


class SolicitationRepository {
  static async create({name, status, subject}: ISolicitationDTO): Promise<void> {
    await SolicitationSchema.create({name, status, subject}).catch(err => {
      logger.error(err, "Failed to create solicitation")
    });
    return
  }

  static async listSolicitationWaiting(limit:number, Skip:number, Status:string): Promise<Solicitation[]> {
    const solicitation = await SolicitationSchema.find({status:Status}).skip(Skip).limit(limit);
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

  static async mongoCount(Status:string): Promise<number> {
    const solicitation = await SolicitationSchema.find({status:Status}).count();
    return solicitation;
  }

}



export { SolicitationRepository }