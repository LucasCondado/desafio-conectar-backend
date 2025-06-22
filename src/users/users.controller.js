"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var roles_decorator_1 = require("../auth/roles.decorator");
var roles_guard_1 = require("../auth/roles.guard");
var swagger_1 = require("@nestjs/swagger");
var UsersController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('users'), (0, swagger_1.ApiBearerAuth)('access-token'), (0, common_1.Controller)('users')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findAll_decorators;
    var _findInactive_decorators;
    var _create_decorators;
    var _getProfile_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var UsersController = _classThis = /** @class */ (function () {
        function UsersController_1(usersService) {
            this.usersService = (__runInitializers(this, _instanceExtraInitializers), usersService);
        }
        UsersController_1.prototype.findAll = function (query) {
            return this.usersService.findAll(query);
        };
        UsersController_1.prototype.findInactive = function () {
            return this.usersService.findInactive();
        };
        UsersController_1.prototype.create = function (createUserDto) {
            // Nenhuma alteração aqui, a lógica de proteção está no service!
            return this.usersService.create(createUserDto);
        };
        UsersController_1.prototype.getProfile = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersService.findOne(req.user.sub)];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Usuário não encontrado');
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersController_1.prototype.findOne = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.user.role !== 'admin' && req.user.sub !== id) {
                                throw new common_1.ForbiddenException('Acesso negado.');
                            }
                            return [4 /*yield*/, this.usersService.findOne(id)];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Usuário não encontrado');
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersController_1.prototype.update = function (id, updateUserDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.user.role !== 'admin' && req.user.sub !== id) {
                                throw new common_1.ForbiddenException('Acesso negado.');
                            }
                            return [4 /*yield*/, this.usersService.update(id, updateUserDto, req.user)];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Usuário não encontrado');
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersController_1.prototype.remove = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.user.role !== 'admin' && req.user.sub !== id) {
                                throw new common_1.ForbiddenException('Acesso negado.');
                            }
                            return [4 /*yield*/, this.usersService.remove(id, req.user)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Usuário removido com sucesso' }];
                    }
                });
            });
        };
        return UsersController_1;
    }());
    __setFunctionName(_classThis, "UsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Listar todos os usuários com filtros/paginação/ordenação (apenas admin)' }), (0, swagger_1.ApiQuery)({ name: 'role', required: false, enum: ['admin', 'user'] }), (0, swagger_1.ApiQuery)({ name: 'name', required: false }), (0, swagger_1.ApiQuery)({ name: 'email', required: false }), (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, enum: ['name', 'createdAt'] }), (0, swagger_1.ApiQuery)({ name: 'order', required: false, enum: ['ASC', 'DESC'] }), (0, swagger_1.ApiQuery)({ name: 'page', required: false }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false }), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('admin')];
        _findInactive_decorators = [(0, common_1.Get)('inactive'), (0, swagger_1.ApiOperation)({ summary: 'Listar usuários inativos (sem login há 30 dias, apenas admin)' }), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('admin')];
        _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Criar novo usuário (público)' })];
        _getProfile_decorators = [(0, common_1.Get)('me'), (0, swagger_1.ApiOperation)({ summary: 'Obter perfil do usuário autenticado' }), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Buscar usuário pelo id (admin ou o próprio usuário)' }), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _update_decorators = [(0, common_1.Patch)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Atualizar usuário (admin ou o próprio usuário)' }), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Remover usuário (admin ou o próprio usuário)' }), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findInactive_decorators, { kind: "method", name: "findInactive", static: false, private: false, access: { has: function (obj) { return "findInactive" in obj; }, get: function (obj) { return obj.findInactive; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
}();
exports.UsersController = UsersController;
