export class ClientesRegistrados {

    constructor() {
        this.ClientBtn = () => cy.get('a[href="/adminClients"]');

        this.grilla = () => cy.get('[role="grid"]');
        this.filas = () => this.grilla().find('[role="row"]');

        this.filtro = (nuevoFiltro) => cy.get(`[data-cy="btn-filtro-${nuevoFiltro.toLowerCase()}"]`);
        this.dropdownEstado = () => cy.get('[data-cy^="select-estado-"]').first();


        //navbar de botones filtros
        this.bttnPendiente = () => cy.get('[data-cy="btn-filtro-pendiente"]');
        this.bttnAprobado = () => cy.get('[data-cy="btn-filtro-aprobado"]');
        this.bttnRechazado = () => cy.get('[data-cy="btn-filtro-rechazado"]');

        this.modalCancelar = () => cy.get('[data-cy="btn-cancelar-modal"]');
        this.modalConfirm = () => cy.get('[data-cy="btn-confirmar-modal"]');
    }

    clickAdminClientes() {
        this.ClientBtn().eq(1).click();
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

    verificarTextoEnGrilla(textoEsperado) {
        this.grilla().contains('span', textoEsperado).should('be.visible');
    }

    /**
     * Funcion para localizar una fila por un texto unico
     * El texto preferentemente deberia ser unico para evitar confusiones
     * En caso que no lo sea, se tomara la primer coincidencia
     * @param {string} textoUnico
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} La fila que contiene el texto unico
     * @param {string} nuevoEstado cambia el estado del usuario al que se le pasa el texto unico
     * estados posibles: Pendiente, Aprobado, Rechazado
     */
    cambiarEstadoDeClientePorTexto(textoUnico, nuevoEstado) {
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


    /* cambiarEstadoUsuario(estado, nuevoEstado) {
        this.filtro(estado).should('be.visible').click();
        this.dropdownEstado().as('dropdown');
        cy.get('@dropdown').click();
        cy.get(`[role="option"][data-key="${nuevoEstado}"]`).click();
        cy.contains("Confirmar cambio de estado").should('be.visible');
    } */

}