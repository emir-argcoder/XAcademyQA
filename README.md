

# 💻 Automatización de Pruebas - Registro de Organizadores de Eventos en Ticketazo

Este repositorio contiene un proyecto de automatización de pruebas end-to-end (E2E) desarrollado con **Cypress**.

-----

## 🚀 Objetivo

El objetivo principal de rama es **automatizar y validar** el flujo de registro de nuevos usuarios (Organizadores de Eventos) en el sitio web de Ticketazo, asegurando que el proceso sea robusto y libre de errores.

Las pruebas automatizadas cubren los siguientes escenarios:

  - ✅ Validación de campos obligatorios.
  - ✅ Verificación de formato de email y contraseña.
  - ✅ Éxito en el registro de un nuevo usuario con datos válidos.
  - ✅ Verificación de la visualización de mensajes de error y éxito.

-----

## 🛠️ Tecnologías Utilizadas

  - **Cypress**: Framework de pruebas E2E.
  - **JavaScript**: Lenguaje de programación.
  - **Visual Studio Code**: Editor de código.

-----

## ⚙️ Configuración del Entorno

Sigue estos pasos para configurar y ejecutar las pruebas en tu máquina local:

### 1\. Requisitos Previos

Asegúrate de tener instalado **Node.js** en tu sistema. Puedes verificarlo con el siguiente comando en tu terminal:

```bash
node -v
npm -v
```

### 2\. Clonar el Repositorio

```bash
git clone https://github.com/nombre-de-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

### 3\. Instalar Dependencias

Instala todas las dependencias del proyecto:

```bash
npm install
```

-----

## ▶️ Cómo Ejecutar las Pruebas

Puedes ejecutar las pruebas de dos maneras:

### 1\. Modo Interactivo

Este modo es ideal para el desarrollo y la depuración, ya que abre la interfaz de usuario de Cypress.

```bash
npx cypress open
```

Una vez que la interfaz se abra, selecciona el archivo de la prueba que deseas ejecutar.

### 2\. Modo Headless (Línea de Comandos)

Este modo ejecuta las pruebas en un navegador en segundo plano (sin la interfaz visual), lo cual es ideal para pipelines de integración continua (CI/CD).

```bash
npx cypress run
```

-----

## 📂 Estructura del Script

La estructura del proyecto sigue las convenciones de Cypress:

```
/cypress
├── /e2e/casos
│   └── register_spec.cy.js    # Script de prueba para el registro
├── /fixtures
├── /support
│   ├── RegisterClientNEG.js   # Comandos personalizados
│   ├── RegisterClientPage.js
│   ├── commands.js            
│   └── e2e.js                 # Importaciones de comandos y utilidades
/cypress.config.js             # Archivo de configuración de Cypress
/README.md                     # Este archivo


-----
-----

¡Felices pruebas\! 🎉