


// called by  :::  npm run prod ../prod-config.js


const fs = require('fs');


console.log("Production build, no TypeCzech bundled")


const PROD_type_czech_import_file = './import-2-require/TypeCzech-2-import_PROD_without_type-czech.js';


const compiled_type_czech_import = './import-2-require/TypeCzech-2-import.js'


fs.copyFileSync(PROD_type_czech_import_file, compiled_type_czech_import);


