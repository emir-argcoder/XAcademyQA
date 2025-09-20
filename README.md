

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

Casos de Pruebas ejecutados: https://docs.google.com/spreadsheets/d/1sll2ZCthMX3CrdwaYsiqeHbAanNNUILEOiTLAeLF49k/edit?gid=1725890393#gid=1725890393

-----

## 🛠️ Tecnologías Utilizadas

  - **Cypress**: Framework de pruebas E2E.
  - **JavaScript**: Lenguaje de programación.
  - **Visual Studio Code**: Editor de código.

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