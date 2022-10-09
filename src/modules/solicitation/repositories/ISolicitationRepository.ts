
import { Solicitation } from "../entities/SolicitationSchema";

export interface ISolicitationRepository {
 create({status, name, subject}: ISolicitationDTO): Promise<void>;

 list(): Promise<Solicitation[]>;

 findById(_id:String): Promise<Solicitation[]>;

 update(_id:String, status:String): Promise<void>;

}