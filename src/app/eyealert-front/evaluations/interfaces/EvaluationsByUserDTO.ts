import { EvaluationDTO } from "./EvaluationDTO";


export interface EvaluationsByUserDTO{
    id: number,
    nombre: string,
    apellido: string,
    evaluaciones: EvaluationDTO[]
}