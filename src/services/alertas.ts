import axios from 'axios';

import type{ ApiResponse } from '@/models/ApiResponse';
import type { WebAppInitData, WebAppUser } from '@twa-dev/types';
import type { AlertaType } from '@/models/Alerts';
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

  export const refreshTime = async (idUser: string) : Promise<ApiResponse> => {

    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/alertas/refreshTime`,
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

  export const getAlertsByType = async (tipo: string, userTelegram: WebAppInitData) : Promise<ApiResponse> => {

    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'GET',
      url: `${import.meta.env.VITE_APP_Web_IP}/alertas/${tipo}`,
      data: {
      
        userTelegram: userTelegram
      }, 
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

  export const acceptAlert = async (id: string) : Promise<ApiResponse> => {

    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/alertas/accept`,
      data: {
        id_alerta: id
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
    } catch (error :  any) {
        console.log("went")
      console.log(error)
     
        
        if (error.response) {
          salida = {
            status: error.response.status,
            data: error.response.data,
          };
        }
      
    }
    
    return salida;
  
  }
  
  export const sendAlert = async (alert: AlertaType, userTelegram: WebAppUser) => {

    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/alertas/send`,
      data: {
        alerta: alert,
        userTelegram: userTelegram
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