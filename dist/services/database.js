"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKnex = exports.connectionProducts = exports.initMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const knex_1 = __importDefault(require("knex"));
const index_1 = __importDefault(require("../config/index"));
mongoose_1.default.set('strictQuery', true);
function initMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('conectando a la db');
            yield mongoose_1.default.connect(index_1.default.MONGO_ATLAS_URL);
            console.log('conexion funcionando!');
        }
        catch (error) {
            console.log(`Error => ${error}`);
            return error;
        }
    });
}
exports.initMongoDB = initMongoDB;
exports.connectionProducts = (0, knex_1.default)(index_1.default.SQL_CONNECTION);
function initKnex() {
    exports.connectionProducts.schema.hasTable('productos').then((exists) => {
        if (exists)
            return;
        console.log('Creamos la tabla productos!');
        return exports.connectionProducts.schema.createTable('productos', (productosTable) => __awaiter(this, void 0, void 0, function* () {
            productosTable.increments('id').primary();
            productosTable.string('nombre').notNullable();
            productosTable.text('descripcion');
            productosTable.float('codigo').notNullable();
            productosTable.text('foto');
            productosTable.float('precio').notNullable();
            productosTable.bigInteger('stock').notNullable();
        }));
    });
}
exports.initKnex = initKnex;
;
//# sourceMappingURL=database.js.map