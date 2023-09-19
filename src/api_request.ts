import axios, { type AxiosResponse, AxiosError } from 'axios';
import type{   WebAppUser } from "@twa-dev/types";
import type { UserType } from './models/TelegramUser';
import type { AlertaType } from './models/Alerts';

interface ApiResponse {
  status: number; // El código de estado HTTP
  data: any;      // Los datos de la respuesta, pueden ser de cualquier tipo
}

const sendAlert = async (alert:AlertaType, stringdata:string) => {
  let salida: ApiResponse = {
    status: 500,
          data: 'Error interno del servidor',
  };
  const configuracion = {

    method: 'POST',
    url: `${import.meta.env.VITE_APP_Web_IP}/sendAlert`,
    data: {
      alerta: alert,
      dataTelegram: stringdata
    }, // Coloca los datos que deseas enviar aquí
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

const getStatus = async (): Promise<number> => {
    let salida: number;
    const configuracion = {
  
      method: 'GET',
      url: `${import.meta.env.VITE_APP_Web_IP}/status`
    }
  
    try {
   
      const respuesta = await axios(configuracion)
      //Si respuesta.data es da true El status será 200 si no la variable salida se iguala a 500
      salida = respuesta.data ? respuesta.status : 500
   
  
    } catch (error) {
      salida = 500
      console.log(error)
    }
    return salida
  
  }
  const checkUser = async (user: WebAppUser | undefined, stringdata :string): Promise<ApiResponse> => {
    let salida: ApiResponse = {
      status: 500,
            data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/checkUser`,
      data: {
        user: user,
        dataTelegram: stringdata
      }, // Coloca los datos que deseas enviar aquí
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
  };
  const createUser = async (user: WebAppUser | undefined, stringdata :string): Promise<ApiResponse> => {
    let salida: ApiResponse = {
      status: 500,
            data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/createUser`,
      data: {
        user: user,
        dataTelegram: stringdata
      }, // Coloca los datos que deseas enviar aquí
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
  };
  


  const getUserFromIdTelegram = async (user: WebAppUser | undefined, stringdata :string): Promise<ApiResponse> => {
  
    let salida: ApiResponse = {
      status: 500,
            data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/getUserFromIdTelegram`,
      data: {
        user: user,
        dataTelegram: stringdata
      }, // Coloca los datos que deseas enviar aquí
    headers: {
      'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
    },
    }
  
    try {
      const respuesta: AxiosResponse<UserType> = await axios(configuracion);
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
  };
  const   saveFavoriteIsle = async (idIsla: string, stringdata :string, idUsuario: string): Promise<ApiResponse> => {
    let salida: ApiResponse = {
      status: 500,
            data: 'Error interno del servidor',
    };
    const configuracion = {
  
      method: 'POST',
      url: `${import.meta.env.VITE_APP_Web_IP}/saveFavoriteIsle`,
      data: {
        idIsla: idIsla,
        idUsuario: idUsuario,
        dataTelegram: stringdata
      }, // Coloca los datos que deseas enviar aquí
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
  };









  
  const sleep = async (milliseconds : number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};
  export{
    getStatus,
    checkUser,
    sendAlert,
    createUser,
    saveFavoriteIsle,
    getUserFromIdTelegram,
    sleep
  }