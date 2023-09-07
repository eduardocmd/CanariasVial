//Interfaz para typescript [La interrogación le dice si es requerida o no]
export interface UserType {
	_id?: string // Agregamos el campo _id
    id_telegram?: number
    username?: string
    first_name: string
    last_name?: string
    type_user?: 'admin' | 'moder' | 'user'
	status_user?:  'pending'|'deny'| 'active' | 'banned'
	penalization?: Number
	Date_creation?: Date
	Date_request?: Date
	Date_ban?: Date
	banned_until?: Date
	num_alertas?: Number,
	ranking?: Boolean,
	favorite_isle?: string

    // ... otras propiedades
}