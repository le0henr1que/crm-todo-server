import logger from "../../../utils/logger";
import { SolicitationSchema, Solicitation } from "../entities/SolicitationSchema";


class SolicitationRepository {
  static async create({name, status, subject}: ISolicitationDTO): Promise<void> {
    await SolicitationSchema.create({name, status, subject}).catch(err => {
      logger.error(err, "Failed to create solicitation")
    });
    return
  }

  static async listSolicitationWaiting(limit:number, Skip:number, Status:string,  subject:string): Promise<Solicitation[]> {
      if(subject == "AllContent"){
        const solicitation = await SolicitationSchema.aggregate([
        {$match : {status:Status} },
        {$sort : {"created_at" : -1}},
        {$skip : Skip},
        {$limit : limit},
      ])
      return solicitation;
      }else{
        const solicitation = await SolicitationSchema.aggregate([
          {$match : {status:Status, subject:subject} },
          {$sort : {"created_at" : -1}},
          {$skip : Skip},
          {$limit : limit},
      ])
      return solicitation;
    }
  }

  static async findById(_id:String): Promise<Solicitation[]> {
    const solicitation = await SolicitationSchema.findById(_id);
    return solicitation;
  }
  
  static async update(_id:String, Status:String): Promise<void> {
    const solicitation = await SolicitationSchema.findByIdAndUpdate({'_id': _id}, {"status": Status});
    return solicitation;
  }

  static async mongoCountStatus(Status:string, subject:string ): Promise<number> {
    if(subject == "AllContent"){
      const solicitation = await SolicitationSchema.find({status:Status}).count();
      return solicitation;
    }else{
      const solicitation = await SolicitationSchema.find({status:Status, subject:subject}).count();
      return solicitation;
    }
  }

}



export { SolicitationRepository }