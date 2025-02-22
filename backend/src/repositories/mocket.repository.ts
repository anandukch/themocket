import Mocket, { IMocket } from "@/models/mocket.model";
import BaseRepository from "./base.repository";

export default class MocketRepository extends BaseRepository<IMocket> {
  constructor() {
    super(Mocket);
  }

  public findByCursor(filter: any) {
    return Mocket.find(filter).cursor();
  }
}
