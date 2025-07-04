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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@nestjs/testing");
var request = require("supertest");
var app_module_1 = require("./../src/app.module");
describe('User Endpoints (e2e)', function () {
    var app;
    var adminToken;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var moduleFixture, loginRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        imports: [app_module_1.AppModule],
                    }).compile()];
                case 1:
                    moduleFixture = _a.sent();
                    app = moduleFixture.createNestApplication();
                    return [4 /*yield*/, app.init()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, request(app.getHttpServer())
                            .post('/auth/login')
                            .send({
                            email: 'admin@admin.com', // ajuste para o email do seu admin
                            password: 'adm123', // ajuste para a senha do seu admin
                        })];
                case 3:
                    loginRes = _a.sent();
                    adminToken = loginRes.body.access_token;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('/users (GET) não retorna campo password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app.getHttpServer())
                        .get('/users')
                        .set('Authorization', "Bearer ".concat(adminToken))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    res.body.forEach(function (user) {
                        expect(user).not.toHaveProperty('password');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('/users/:id (GET) não retorna campo password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createRes, userId, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app.getHttpServer())
                        .post('/users')
                        .set('Authorization', "Bearer ".concat(adminToken))
                        .send({
                        name: 'Teste GET',
                        email: "testget".concat(Date.now(), "@mail.com"),
                        password: 'SenhaForte123!',
                    })];
                case 1:
                    createRes = _a.sent();
                    userId = createRes.body.id;
                    return [4 /*yield*/, request(app.getHttpServer())
                            .get("/users/".concat(userId))
                            .set('Authorization', "Bearer ".concat(adminToken))];
                case 2:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).not.toHaveProperty('password');
                    return [2 /*return*/];
            }
        });
    }); });
    it('/users/:id (PATCH) não retorna campo password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createRes, userId, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app.getHttpServer())
                        .post('/users')
                        .set('Authorization', "Bearer ".concat(adminToken))
                        .send({
                        name: 'Teste PATCH',
                        email: "testpatch".concat(Date.now(), "@mail.com"),
                        password: 'SenhaForte123!',
                    })];
                case 1:
                    createRes = _a.sent();
                    userId = createRes.body.id;
                    return [4 /*yield*/, request(app.getHttpServer())
                            .patch("/users/".concat(userId))
                            .set('Authorization', "Bearer ".concat(adminToken))
                            .send({ name: 'Novo Nome Automatizado' })];
                case 2:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).not.toHaveProperty('password');
                    return [2 /*return*/];
            }
        });
    }); });
    it('/users/:id (DELETE) não retorna campo password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createRes, userId, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app.getHttpServer())
                        .post('/users')
                        .set('Authorization', "Bearer ".concat(adminToken))
                        .send({
                        name: 'Para Deletar',
                        email: "delete".concat(Date.now(), "@email.com"),
                        password: 'SenhaForte123',
                    })];
                case 1:
                    createRes = _a.sent();
                    userId = createRes.body.id;
                    return [4 /*yield*/, request(app.getHttpServer())
                            .delete("/users/".concat(userId))
                            .set('Authorization', "Bearer ".concat(adminToken))];
                case 2:
                    res = _a.sent();
                    expect([200, 204]).toContain(res.status); // Aceita 200 ou 204
                    if (res.body) {
                        expect(res.body).not.toHaveProperty('password');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
