/**
 * control/appTools.js
 * Ferramentas de uso geral no aplicativo.
 */

const appTools = {

    // Calcula idade.
    getAge: (birth) => {
        return ~~((Date.now() - +new Date(birth)) / (31557600000));
    }   
}

// Exporta o módulo.
module.exports = appTools;

/**
 * By Luferat 2023
 * MIT Licensed
 */