export interface AlertaType {

    _id: string // Agregamos el campo _id
    alerta: string
    id_usuario: string
    tipo_alerta: string
    estado_alerta?: 'pending' | 'activa' | 'denegada' | 'eliminada'
    latitud?: string
    longitud?: string
    date_creation?: Date

}