"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteKnex = exports.updateKnex = exports.createKnex = exports.getKnex = void 0;
const database_1 = require("../services/database");
/* import { IProductos } from '../../models/productos'

function comprobarProducto(producto: IProductos) {
    if (typeof product.price == 'string') product.price = parseFloat(product.price);
    if (!product.title || !product.price || !product.thumbnail || typeof product.title !== 'string' ||
        typeof product.price !== 'number' || typeof product.thumbnail !== 'string') throw createError(400, 'Datos invalidos');
} */
function getKnex(tableName, id) {
    if (tableName == 'productos') {
        if (id)
            return (0, database_1.connectionProducts)(tableName).where('id', id);
        return database_1.connectionProducts.from(tableName).select('*');
    }
}
exports.getKnex = getKnex;
;
function createKnex(tableName, data) {
    if (tableName == 'productos') {
        return (0, database_1.connectionProducts)(tableName).insert(data);
    }
}
exports.createKnex = createKnex;
;
function updateKnex(tableName, data, id) {
    if (tableName == 'productos') {
        return (0, database_1.connectionProducts)(tableName).where('id', id).update(data);
    }
}
exports.updateKnex = updateKnex;
;
function deleteKnex(tableName, id) {
    if (tableName == 'productos') {
        return (0, database_1.connectionProducts)(tableName).where('id', id).del();
    }
}
exports.deleteKnex = deleteKnex;
;
//# sourceMappingURL=knex.js.map