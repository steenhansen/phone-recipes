

// called by  :::  npm run dev ../dev-config.js

const fs = require('fs');


console.log("Development build, TypeCzech bundled")



const DEV_type_czech_import_file = './import-2-require/TypeCzech-2-import_DEV_with_type-czech_on.js';


const compiled_type_czech_import = './import-2-require/TypeCzech-2-import.js'


fs.copyFileSync(DEV_type_czech_import_file, compiled_type_czech_import);


