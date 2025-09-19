#  Pruebas automatizadas con Cypress
## 1. Visión general del proyecto
Esta suite de pruebas automatizadas fue diseñada para verificar dos funcionalidades críticas de la aplicación: el flujo de inicio de sesión (Login) y el flujo de restablecimiento de contraseña. El objetivo principal es asegurar la correcta gestión de usuarios y la seguridad del acceso.

El código de automatización se implementó con Cypress y se utilizó ChatGPT-5 como herramienta de apoyo para la generación y estructuración de los scripts.

## 2 . Requisitos y configuración
Para poder ejecutar estas pruebas, es necesario tener instalado lo siguiente:

Node.js: La versión 12 o superior.

Cypress: Se instalará como dependencia del proyecto.

Para la configuración inicial, navega al directorio del proyecto y ejecuta el siguiente comando en tu terminal para instalar todas las dependencias:

npm install

## 3. Funcionalidades bajo prueba
A. Login
Verifica que solo los usuarios con credenciales válidas y verificadas puedan acceder al sistema, bloqueando cualquier intento de acceso indebido.

### Flujo principal:

CP001: Inicio de sesión exitoso con usuario y contraseña correctos. El sistema redirige a la URL principal, confirma el acceso y cierra sesión.

### Casos alternativos:

CP002: Usuario no verificado.

CP003, CP004, CP006: Datos de email o contraseña incorrectos.

CP005, CP007, CP008: Campos de email o contraseña vacíos.

Test exploratorio: Usuario no verificado + contraseña vacía.

### B. Restablecimiento de contraseña
Asegura que los usuarios puedan recuperar el acceso a sus cuentas de forma segura en caso de haber olvidado su contraseña.

## Flujo principal:

CP001 - CP004: Restablecimiento de contraseña exitoso de extremo a extremo (navegación, envío de correo, recepción del link y cambio de contraseña).

Casos alternativos:

CP005 - CP007: Emails inválidos, inexistentes o no verificados.

CP009: Intento de usar una contraseña nueva inválida.

CP010: Contraseña nueva y confirmación no coinciden.

## 4. Objetivos de las pruebas
La suite de pruebas busca cumplir con los siguientes objetivos generales:

Validar la seguridad: Asegurar que los intentos de acceso y los cambios de contraseña con datos incorrectos o incompletos sean bloqueados de forma segura.

Confirmar la experiencia de usuario: Verificar que los mensajes de error sean claros, precisos y coherentes en todas las interacciones.

Verificar la funcionalidad: Comprobar que los flujos de login y restablecimiento funcionen correctamente de extremo a extremo.

Garantizar la consistencia: Validar el comportamiento del sistema tanto en escenarios válidos (camino feliz) como en escenarios de error (casos alternativos).

## 5. Estructura del proyecto
El proyecto de automatización sigue la siguiente estructura de directorios:

cypress/e2e/: Contiene los archivos de los casos de prueba (tests).

cypress/fixtures/: Almacena los datos de prueba (test data), como las credenciales de usuarios.

cypress/support/: Incluye comandos personalizados y constantes que se utilizan a lo largo de las pruebas.

## 6. Instrucciones de ejecución
Para correr los tests, asegúrate de tener las dependencias instaladas y luego ejecuta uno de los siguientes comandos en la terminal:

npx cypress open: Este comando abre la interfaz de usuario de Cypress, donde puedes ver y ejecutar los tests de forma interactiva. Es ideal para el desarrollo y la depuración.

npx cypress run: Este comando ejecuta todos los tests en la línea de comandos de forma automática (sin abrir la interfaz gráfica). Es útil para la integración continua (CI) o para ejecuciones rápidas y sin supervisión.
