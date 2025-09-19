#  Suite de pruebas automatizadas
## 1. Visión general del proyecto
Esta suite de pruebas automatizadas fue diseñada para validar la funcionalidad integral de la aplicación tiketazo desde la perspectiva de diferentes usuarios. El objetivo principal es asegurar la estabilidad, seguridad y calidad del sistema en sus flujos clave, desde el registro de usuarios hasta la gestión y compra de eventos.

El código de automatización fue implementado con Cypress y utiliza Node.js y npm como base.

## 2. Funcionalidades bajo prueba
Aquí se documentan las principales funcionalidades de la aplicación que han sido cubiertas por las pruebas de automatización:

### A. Gestión de usuarios
Registro de usuario: Verificación del flujo de creación de cuentas de cliente y creador de eventos, incluyendo validaciones de datos y mensajes de error.

Inicio de sesión (Login): Validaciones para acceso de usuarios con credenciales válidas y manejo de errores para credenciales inválidas o usuarios no verificados.

Restablecimiento de contraseña: Verificación del flujo completo de recuperación de contraseña, incluyendo el envío de correo de confirmación y el cambio de contraseña.

### B. Gestión de eventos
Crear evento: Creación de un evento por parte del usuario creador de eventos, incluyendo validaciones de campos y confirmación.

Dar de alta evento: Publicación del evento, incluyendo la configuración de fechas, horarios etc.

Crear salas: Creación de salas de eventos.

### C. Interfaz y Navegación
Validaciones en Home: Verificación de que la página principal (Home) muestre la información correcta para el rol del usuario que haya iniciado sesión (cliente o creador de eventos).

### D. Acciones del usuario cliente
Comprar entradas para evento: Flujo de compra de tickets para un evento específico, desde la selección hasta la confirmación de la transacción.

## 3. Tipos de usuario
Las pruebas fueron diseñadas para validar el comportamiento del sistema desde la perspectiva de tres roles principales:

Super Administrador: Gestor del sistema con acceso total.

Usuario Cliente: Usuario común que consume contenido y compra entradas.

Usuario Creador de Eventos: Usuario que crea y gestiona eventos para su publicación.

## 4. Requisitos y configuración
Para poder ejecutar estas pruebas, es necesario tener instalado lo siguiente:

Node.js: La versión 12 o superior.

Cypress: Se instalará como dependencia del proyecto.

Para la configuración inicial, navega al directorio del proyecto y ejecuta el siguiente comando en tu terminal para instalar todas las dependencias:

npm install

## 5. Instrucciones de ejecución
Para correr los tests, asegúrate de tener las dependencias instaladas y luego ejecuta uno de los siguientes comandos en la terminal:

npx cypress open: Este comando abre la interfaz de usuario de Cypress, donde puedes ver y ejecutar los tests de forma interactiva.

npx cypress run: Este comando ejecuta todos los tests en la línea de comandos de forma automática.

## Link a documentación del proyecto:
Matriz de casos de prueba: https://docs.google.com/spreadsheets/d/1sll2ZCthMX3CrdwaYsiqeHbAanNNUILEOiTLAeLF49k/edit?gid=1528370784#gid=1528370784
Tablero de Trello: https://trello.com/b/Yb8oPnBj/grupo-7
