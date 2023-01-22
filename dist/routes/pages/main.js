"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const productosController = __importStar(require("../../controllers/knex"));
const mensajes_1 = require("../../controllers/mensajes");
const http_errors_1 = __importDefault(require("http-errors"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../../middlewares/auth");
const logger_1 = require("../../services/logger");
const router = (0, express_1.Router)();
const tableName = 'productos';
//const passportOptions = { failureRedirect: '/login' };
//Login, logout y signup
router.get('/login', (req, res, next) => {
    logger_1.logger.info('GET /login');
    res.render('login', { layout: 'layoutLogin' });
});
router.post('/login', passport_1.default.authenticate('login', { failureRedirect: '/errorLogin' }), (req, res, next) => {
    logger_1.logger.info('POST /login');
    res.redirect('/');
});
router.post('/signUp', passport_1.default.authenticate('signup', { failureRedirect: '/errorSignUp' }), (req, res, next) => {
    logger_1.logger.info('POST /signUp');
    res.render('login', { layout: 'layoutLogin' });
});
router.get('/logout', (req, res, next) => {
    logger_1.logger.info('GET /logout');
    try {
        req.session.destroy((err) => {
            if (!err)
                res.redirect('/');
            else
                throw (0, http_errors_1.default)(500, 'Logout ERROR');
        });
    }
    catch (error) {
        next(error);
    }
});
//errores
router.get('/errorLogin', (req, res, next) => {
    logger_1.logger.info('GET /errorLogin');
    try {
        res.render('error', { layout: 'error', error: 'Error en el login' });
    }
    catch (error) {
        next(error);
    }
});
router.get('/errorSignUp', (req, res, next) => {
    logger_1.logger.info('GET /errorSignUp');
    try {
        res.render('error', { layout: 'error', error: 'Error en la creacion de usuario' });
    }
    catch (error) {
        next(error);
    }
});
//main
router.get('/', auth_1.isLoggedInPage, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('GET /');
    try {
        const datos = {
            productos: yield productosController.getKnex(tableName),
            mostrar: true,
            ruta: '/',
            mensajes: yield (0, mensajes_1.getAllNormal)(),
            user: req.user.username
        };
        if (!Array.isArray(datos.productos) || datos.productos.length === 0)
            datos.mostrar = false;
        /* const wsServer = getWsServer();
        console.log(wsServer);
        wsServer.emit('message', datos); */
        res.render('carga_vista', datos);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('POST /');
    try {
        const producto = req.body;
        yield productosController.createKnex(tableName, producto);
        res.redirect('/');
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=main.js.map