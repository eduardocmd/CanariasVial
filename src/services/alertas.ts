import axios, { type AxiosResponse, AxiosError } from 'axios';

import type{ ApiResponse } from '@/models/ApiResponse';
export const getAlertas = async () : Promise<ApiResponse> => {

    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'GET',
      url: `${import.meta.env.VITE_APP_Web_IP}/alertas`,
      
      headers: {
        'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
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
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          salida = {
            status: axiosError.response.status,
            data: axiosError.response.data,
          };
        }
      }
    }
  
    return salida;
  
  }