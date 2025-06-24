export interface UserDTO{
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    rol: string;
    cuestionarioCompletado: boolean;
    fecha: string;
    jwt: string;
}