export interface Quizz {
    quizzId: number,
    puntaje: number,
    fecha: string,
    usuario: UserSimple
}


interface UserSimple {
    id: number,
    nombres: string,
    apellidos: string
}