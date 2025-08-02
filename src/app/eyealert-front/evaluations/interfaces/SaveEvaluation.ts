export interface SaveEvaluation {
    tiempo_prediccion:        number;
    tiempo_prediccion_inicio: string;
    tiempo_prediccion_fin:    string;
    resultado:                number;
    usuario_id:               number;
    detalle_evaluacion:       DetalleEvaluacion[];
}

export interface DetalleEvaluacion {
    pregunta_id:     number;
    respuesta_id:    number | null;
    respuesta_texto: string;
}
