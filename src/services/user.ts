import axios from 'axios';
import type{ ApiResponse } from '@/models/ApiResponse';
import type { WebAppUser } from '@twa-dev/types';
export const telegramUserInDB = async (id : number ) : Promise<ApiResponse> => {

    let salida: ApiResponse = {
        status: 500,
        data: 'Error interno del servidor',
      };
      const configuracion = {
    
        method: 'POST',
        url: `${import.meta.env.VITE_APP_Web_IP}/user/tluserindb`,
        data: {
          id_telegram: id,
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
  export const userInChannel = async (user_id? : number, isla? : string) : Promise<ApiResponse> => {
    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/user/userinchannel`,
      data: {
        id_usuario: user_id,
        isla: isla
      }, 
      headers: {
        'Content-Type': 'application/json', 
        webappinitdata: window.Telegram.WebApp.initData
      },
    }
  
    try {

      const respuesta = await axios(configuracion)
      console.log(respuesta)


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
  
    return salida;
  
  }
  export const createUser = async (user: WebAppUser | undefined): Promise<ApiResponse> => {
    let salida: ApiResponse = {
      status: 500,
      data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/user/createuser`,
      data: {
        user: user,
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
  };
  
  export const getUserFromIdTelegram = async (id : number ) : Promise<ApiResponse> => {
  
    let salida: ApiResponse = {
        status: 500,
        data: 'Error interno del servidor',
      };

      const configuracion = {
    
        method: 'POST',
        url: `${import.meta.env.VITE_APP_Web_IP}/user/getuserfromtelegramid`,
        data: {
          id_telegram: id,
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