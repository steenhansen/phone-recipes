const { NOP_TYPE_CZECH } = require('./common-2-require.js');

let type_czech = NOP_TYPE_CZECH;

if (global.GLOBAL_CONFIG.G_TYPE_CZECH_ON) {
  const { TypeCzech } = require('./TypeCzech-2-require');
  type_czech = TypeCzech(...global.GLOBAL_CONFIG.G_TYPE_CZECH_OPTIONS)
}

module.exports = { type_czech };