'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let [fotos] = await queryInterface.sequelize.query('SELECT id FROM fotos')
    let [etiquetas] = await queryInterface.sequelize.query('SELECT id FROM etiquetas')

    for(let foto of fotos) {
      const etiquetasDisponibles = [...etiquetas];
      
      for(let i = 0; i < 2 && etiquetasDisponibles.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * etiquetasDisponibles.length);
        const etiquetaSeleccionada = etiquetasDisponibles[randomIndex];
        
        await queryInterface.bulkInsert('fotoetiquetas', [{
          foto_id: foto.id,
          etiqueta_id: etiquetaSeleccionada.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
        
        etiquetasDisponibles.splice(randomIndex, 1);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {}); 
  }
};
