import axios from 'axios';
import type{ ApiResponse } from '@/models/ApiResponse';

export const saveFavoriteIsle = async (idIsla: string, idUsuario: string) : Promise<ApiResponse> => {

    let salida: ApiResponse = {
        status: 500,
        data: 'Error interno del servidor',
      };
      const configuracion = {
    
        method: 'POST',
        url: `${import.meta.env.VITE_APP_Web_IP}/islas/saveFavoriteIsle`,
        data: {
            idIsla: idIsla,
            idUsuario: idUsuario
          }, 
        headers: {
          'Content-Type': 'application/json', 
          webappinitdata: window.Telegram.WebApp.initData 
        },
      }
    
      try {
        const respuesta = await axios(configuracion)
        // ...
        salida = {
          status: respuesta.status,
          data: respuesta.data,
        };
      } catch (error) {
        
        if (axios.isAxiosError(error)) {
          
          if (error.response) {
            salida = {
              status: error.response.status,
              data: error.response.data,
            };
          }
        }
      }
    
      return salida;
  
  }