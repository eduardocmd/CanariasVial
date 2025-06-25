// stores/auth.ts
import { defineStore } from 'pinia'

export const useIsleStore = defineStore('isle', {
  state: () => ({
isle: ''
  }),

  actions: {
    // Método para iniciar sesión
    setIsle(isle: string) {
   this.isle = isle
     
    },

    // Método para cerrar sesión
    removeIsle() {
     this.isle = ''
    },

  
  },

  persist: true // Usamos persistencia para mantener el estado en recargas de página
})
