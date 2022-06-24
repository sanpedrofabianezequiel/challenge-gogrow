import { AxiosInstance as AxiosInstances, AxiosResponse } from "axios";
import { AxiosInstance } from "../../AxiosInstance";
import { IUserDAO } from "../../InterfacesDAO/IUserDAO";
import { ISignIn } from "../../../application/interfaces";

export class ImplUserDAO implements IUserDAO {
  private _axios: AxiosInstances;
  constructor() {
    this._axios = AxiosInstance();
  }
  async getAll(): Promise<any> {
    let response: any = {};
    try {
      response = (await this._axios.get("/users")) as AxiosResponse<any>;
    } catch (error) {
      console.log(error);
    }
    return response.data as any;
  }
  getById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async createUser(data: ISignIn): Promise<any> {
    let response: any = {};
    try {
      response = (await this._axios.post("/users",data)) as AxiosResponse<any>;
      return response.data as any;
    } catch (error) {
      return response as any;
    }
   
  }
  updateUser(id: number, data: any): Promise<any> {
    return  new Promise((resolve, reject) => {
      resolve([]);
  })
  }
  deleteUser(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
