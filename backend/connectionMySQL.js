const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: "localhost",
    port: "3306",
    database: "inventario",
    user: "root",
    password: ""
});

module.exports = { pool }; // Cambia la exportación a CommonJS
