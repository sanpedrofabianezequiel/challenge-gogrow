import { ISignIn } from "../../application/interfaces";

export interface IUserDAO {
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    createUser(data: ISignIn): Promise<any>;
    updateUser(id: number, data: any): Promise<any>;
    deleteUser(id: number): Promise<any>;
}