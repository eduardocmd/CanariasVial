import axios, { Axios, AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
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
  const checkUser = async (): Promise<AxiosResponse | undefined> => {
    let salida: AxiosResponse | undefined;
    const configuracion: AxiosRequestConfig = {
      method: 'GET',
      url: `${import.meta.env.VITE_APP_Web_IP}/checkUser`,
    };
  
    try {
      const respuesta = await axios(configuracion);
      // Si respuesta.data es true, el status será 200; de lo contrario, la variable salida se iguala a 500
      salida = respuesta;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // El error es de tipo AxiosError
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          salida = axiosError.response;
        } else {
          // Si no hay respuesta en el error, puedes establecer el código de estado en 500
          const config: InternalAxiosRequestConfig = {
            
          }
          salida = {
            status: 500,
            data: 'Error interno del servidor', // Puedes personalizar el mensaje de error
            headers: {},
            config: configuracion, // Usamos la configuración predeterminada
            request: axiosError.request,
            statusText: '',
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
    sleep
  }