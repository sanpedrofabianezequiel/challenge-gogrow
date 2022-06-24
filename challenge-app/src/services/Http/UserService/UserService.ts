import { ISignIn } from "../../../application/interfaces";
import { ImplUserDAO } from "../../ImplDAO";
import { IUserDAO } from "../../InterfacesDAO/IUserDAO";


export class UserService {
    private userDAO: IUserDAO;

    constructor() {
        this.userDAO = new ImplUserDAO();
    }
    async getAllUsers(): Promise<any> {
        return await this.userDAO.getAll();
    }
    async createUser(data: ISignIn): Promise<any> {
        return await this.userDAO.createUser(data);
    }
}