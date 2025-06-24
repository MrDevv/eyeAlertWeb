import { UserDTO } from "./UserDTO";

export interface ResponseLoginDTO{
    status: string;
    code: number;
    message: string;
    data: UserDTO | null
}