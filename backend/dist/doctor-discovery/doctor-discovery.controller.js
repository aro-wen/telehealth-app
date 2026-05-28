"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorDiscoveryController = void 0;
const common_1 = require("@nestjs/common");
const doctor_discovery_service_1 = require("./doctor-discovery.service");
let DoctorDiscoveryController = class DoctorDiscoveryController {
    discoveryService;
    constructor(discoveryService) {
        this.discoveryService = discoveryService;
    }
    async listDoctors(spec, avail) {
        return this.discoveryService.getDoctors({
            specialization: spec,
            available: avail,
        });
    }
    aiRecommend(body) {
        const specializations = this.discoveryService.recommendSpecialization(body.symptoms);
        return {
            recommendedSpecializations: specializations,
            note: 'Based on symptom keyword mapping',
        };
    }
};
exports.DoctorDiscoveryController = DoctorDiscoveryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('specialization')),
    __param(1, (0, common_1.Query)('available')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorDiscoveryController.prototype, "listDoctors", null);
__decorate([
    (0, common_1.Post)('ai-recommend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DoctorDiscoveryController.prototype, "aiRecommend", null);
exports.DoctorDiscoveryController = DoctorDiscoveryController = __decorate([
    (0, common_1.Controller)('doctors'),
    __metadata("design:paramtypes", [doctor_discovery_service_1.DoctorDiscoveryService])
], DoctorDiscoveryController);
//# sourceMappingURL=doctor-discovery.controller.js.map