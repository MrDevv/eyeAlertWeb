
export interface ResponseRanking{
    ranking?: ranking[],
    puesto_usuario?: ranking
}

export interface ranking{
    puesto: number;
    usuarioId: number;
    nombres: string;
    puntaje?: number;
}