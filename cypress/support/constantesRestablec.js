
export const SELECTORES = {
  // Pantalla login
  login: {
    linkOlvidaste: '[data-cy="btn-forgot-password"]' 
  },

  //  Pantalla de "Olvidaste tu contraseña" 
  restablecer: {
    campoEmail: '[data-cy="input-email"]',       
    botonEnviar: '[data-cy="btn-enviar"]'      // ej: 'button[type="submit"]'
  },

  // Pantalla de "Nueva contraseña" 
  restablecerConfirmacion: {
    campoNuevaContraseña: '[data-cy="input-nueva-password"]',     
    campoConfirmarContraseña: '[data-cy="input-confirmar-password"]',  
    botonGuardar: '[data-cy="btn-confirmar"]'           
  },

  //  URLs usadas en las pruebas 
  urls: {
    login: 'https://vps-3696213-x.dattaweb.com/auth/login',
    restablecer: 'https://vps-3696213-x.dattaweb.com/auth/forgotPassword',          // cuando hacés click en "¿Olvidaste tu contraseña?"
    restablecerConfirmacion: 'https://vps-3696213-x.dattaweb.com/auth/resetPassword' // cuando venís desde el email con token
  }
};
