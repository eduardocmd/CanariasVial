import axios from 'axios';
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
  const sleep = async (milliseconds : number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};
  export{
    getStatus,
    sleep
  }