import axios from 'axios';

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

  export const pendingByUser = async (idUser: string) : Promise<ApiResponse> => {

    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST••••••••',
      url: `${import.meta.env.VITE_APP_Web_IP}/alertas/pendingbyuser`,
      data: {
        id_usuario: idUser,
      }, 
      headers: {
        'Content-Type': 'application/json', 
        webappinitdata: window.Telegram.WebApp.initData
      },
    }
  
    try {
      
      const respuesta = await axios(configuracion)
    
      salida = {
        status: respuesta.status,
        data: respuesta.data,
      };
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        
        if (error.response) {
          salida = {
            status: error.response.status,
            data: error.response.data,
          };
        }
      }
    }
    console.log("entro")
    return salida;
  
  }