"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueryDto = void 0;
var class_validator_1 = require("class-validator");
var user_entity_1 = require("../entities/user.entity");
var UserQueryDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UserQueryDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.role = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.sortBy = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
                this.order = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _order_initializers, void 0));
                this.page = (__runInitializers(this, _order_extraInitializers), __runInitializers(this, _page_initializers, void 0));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                __runInitializers(this, _limit_extraInitializers);
            }
            return UserQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _email_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _role_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(user_entity_1.Role)];
            _sortBy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['name', 'createdAt'])];
            _order_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['ASC', 'DESC', 'asc', 'desc'])];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumberString)()];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumberString)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UserQueryDto = UserQueryDto;
