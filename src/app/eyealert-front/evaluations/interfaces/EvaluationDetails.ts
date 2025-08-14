export interface EvaluationDetails {
    detalle_evaluacion_id: number,
    evaluacion_id: number,
    nombres: string,
    apellidos: string,
    email: string,
    fecha: string,
    resultado: string,
    resultado_especialista: string,
    tiempo_prediccion: number,
    tiempo_prediccion_inicio: string,
    tiempo_prediccion_fin: string
    listPreguntaRespuesta: PreguntaRespuesta[]    
}


interface PreguntaRespuesta {
    pregunta: string,
    respuesta: string
}