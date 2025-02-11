export interface AlertaType {

    _id: string // Agregamos el campo _id
    alerta: string,
    isla: string,
    id_usuario: string
    tipo_alerta: string
    estado_alerta?: 'pending' | 'activa' | 'denegada' | 'eliminada'
    latitud?: number
    longitud?: number
    date_creation?: Date

}