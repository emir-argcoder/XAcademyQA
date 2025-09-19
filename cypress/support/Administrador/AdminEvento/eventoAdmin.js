
export class EventoAdminn {

    constructor() {
        //Navbar
        this.AdminBtn = () => cy.get('a[href="/adminTable"]');

        //Tabla Eventos
        this.grilla = () => cy.get('[role="grid"]');
        this.filas = () => this.grilla().find('[role="row"]');
        this.estado = () => cy.get('[data-cy^="select-estado-"]');

        //navbar de botones filtros
        this.bttnCreado = () => cy.get('[data-cy="btn-filtro-creado"]');
        this.bttnAprobado = () => cy.get('[data-cy="btn-filtro-aprobado"]');
        this.bttnRechazado = () => cy.get('[data-cy="btn-filtro-rechazado"]');
        this.bttnCompletado = () => cy.get('[data-cy="btn-filtro-completado"]');
        this.bttnPendiente = () => cy.get('[data-cy="btn-filtro-pospuesto"]');
        this.cancelado = () => cy.get('[data-cy="btn-filtro-cancelado"]');


        //modal
        this.modalCancelar = () => cy.get('[data-cy="btn-cancelar-modal"]');
        this.modalConfirm = () => cy.get('[data-cy="btn-confirmar-modal"]');
    }

    clickAdminEventos() {
        this.AdminBtn().eq(1).click({});
    }

    clickEstadoBttn() {
        this.estado().click();
    }

    clickModalAceptar() {
        this.modalConfirm().click();
    }

    clickModalCancelar() {
        this.modalCancelar().click();
    }

    verificarTextoEnGrilla(textoEsperado/* : string */) {
        this.grilla().contains('span', textoEsperado).should('be.visible');
    }

    // Función para obtener una fila por texto único
    /* obtenerFilaPorTexto(textoUnico) {
        return this.filas() // obtenemos todas las filas
            .filter((index, fila) => {
                // Filtramos la fila que contiene el texto dentro de cualquier td/span
                return Cypress.$(fila).text().includes(textoUnico);
            })
            .first() // si hay más de una coincidencia, tomamos la primera
            .then(fila => {
                console.log('Fila completa como DOM:', fila);
                const celdas = fila.querySelectorAll('td');
                [...celdas].forEach((celda, i) => {
                    console.log(`Celda ${i}:`, celda.innerText);
                });
                //console.log('Fila encontrada:', textoFila);
                return cy.wrap(fila); // envolvemos en cy.wrap() para poder encadenar comandos de Cypress
            });
    }
 */

    obtenerFilaPorTexto(textoUnico) {
        return this.filas()
            .filter((index, fila) => Cypress.$(fila).text().includes(textoUnico))
            .first()
            .then(fila => {
                const domFila = fila.get(0); // convertir de jQuery a DOM nativo

                // Texto completo de la fila
                const textoFila = domFila.innerText;
                cy.log(`Fila encontrada: ${textoFila}`);
                console.log('Texto completo de la fila:', textoFila);

                // Fila como objeto DOM
                //console.log('Fila DOM:', domFila);

                // Cada celda (td)
                const celdas = domFila.querySelectorAll('td');
                [...celdas].forEach((celda, i) => {
                    console.log(`Celda ${i}:`, celda.innerText);
                });

                return cy.wrap(domFila); // devolvemos la fila envuelta para seguir usándola
            });
    }

    /* obtenerDatosFila(textoUnico) {
        return this.obtenerFilaPorTexto(textoUnico).then($fila => {
            const celdas = $fila.find('td');
            const datos = {
                nombreEvento: celdas[0].innerText.trim(),
                fecha: celdas[1].innerText.trim(),
                fechaHora: celdas[2].innerText.trim(),
                lugar: celdas[3].innerText.trim(),
                email: celdas[4].innerText.trim(),
                cantidad: celdas[5].innerText.trim(),
                estado: celdas[6].innerText.trim()
            };
            console.log('Objeto fila:', datos);
            return datos; // devuelve un JSON con los datos
        });
    } */

    obtenerDatosFila(textoUnico) {
        return this.filas()
            .filter((index, fila) => Cypress.$(fila).text().includes(textoUnico))
            .first()
            .then(fila => {
                const $fila = Cypress.$(fila);
                const celdas = $fila.find("td");

                const datos = {
                    nombreEvento: celdas.eq(0).text().trim(),
                    fecha: celdas.eq(1).text().trim(),
                    fechaHora: celdas.eq(2).text().trim(),
                    direccion: celdas.eq(3).text().trim(),
                    email: celdas.eq(4).text().trim(),
                    cantidad: celdas.eq(5).text().trim(),
                };

                // 🎯 ahora usamos directamente el data-cy del select
                return cy.wrap($fila)
                    .find('[data-cy^="select-estado-"]')
                    .invoke("text")
                    .then(estadoActual => {
                        datos.estado = estadoActual.trim();
                        return datos;
                    });
            });
    }

    cambiarEstadoEvento(nuevoFiltro, nuevoEstado) {
        cy.get(`[data-cy="${nuevoFiltro}"]`).should('be.visible').click();
        cy.get('[data-cy^="select-estado-"]').first().as('dropdown');
        cy.get('@dropdown').click();
        cy.get(`[role="option"][data-key="${nuevoEstado}"]`).click();
        // Validamos que se muestre el modal de confirmacion,
        // pero no confirmamos para evitar modificar datos reales en el entorno de Ticketazo.
        cy.contains("Confirmar cambio de estado").should('be.visible');
    }

    /**
     * Funcion para localizar una fila por un texto unico
     * El texto preferentemente deberia ser unico para evitar confusiones
     * En caso que no lo sea, se tomara la primer coincidencia
     * @param {string} textoUnico
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} La fila que contiene el texto unico
     * @param {string} nuevoEstado cambia el estado del evento al que se le pasa el texto unico
     * estados posibles: Pendiente, Aprobado, Rechazado
     */
    cambiarEstadoDeEventoPorTexto(textoUnico, nuevoEstado) {
        // Esperamos a que la grilla tenga filas cargadas
        this.filas().should('have.length.greaterThan', 0);
        // Buscamos la fila por texto único
        this.filas()
            .filter((index, fila) => Cypress.$(fila).text().includes(textoUnico))
            .first()
            .should('exist')
            .then(fila => {
                const $fila = Cypress.$(fila);
                // Encontramos el select dentro de esa fila
                cy.wrap($fila)
                    .find('[data-cy^="select-estado-"]')
                    .as('dropdown');

                // Cambiamos el estado
                cy.get('@dropdown').click();
                cy.wait(2000)
                cy.get(`[role="option"][data-key="${nuevoEstado}"]`).click();
                cy.wait(2000)
                // Validamos el modal
                cy.contains("Confirmar cambio de estado").should('be.visible');
            });
    }

}