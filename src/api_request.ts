import axios, { AxiosError} from 'axios';
import type{   WebAppUser } from "@twa-dev/types";

interface ApiResponse {
  status: number; // El código de estado HTTP
  data: any;      // Los datos de la respuesta, pueden ser de cualquier tipo
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
  
  const sleep = async (milliseconds : number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};
  export{
    getStatus,
    checkUser,
    createUser,
    sleep
  }