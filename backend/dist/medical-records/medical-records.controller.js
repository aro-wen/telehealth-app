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
exports.MedicalRecordsController = void 0;
const common_1 = require("@nestjs/common");
const medical_records_service_1 = require("./medical-records.service");
const create_record_dto_1 = require("./dto/create-record.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MedicalRecordsController = class MedicalRecordsController {
    recordsService;
    constructor(recordsService) {
        this.recordsService = recordsService;
    }
    async create(req, dto) {
        if (req.user.role !== 'DOCTOR') {
            throw new common_1.ForbiddenException('Only doctors can create medical records');
        }
        return this.recordsService.createRecord(req.user.userId, dto);
    }
    async getMyRecords(req) {
        if (req.user.role !== 'PATIENT') {
            throw new common_1.ForbiddenException('Only patients can view their records');
        }
        return this.recordsService.getPatientRecords(req.user.userId);
    }
};
exports.MedicalRecordsController = MedicalRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_record_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", Promise)
], MedicalRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('patient'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordsController.prototype, "getMyRecords", null);
exports.MedicalRecordsController = MedicalRecordsController = __decorate([
    (0, common_1.Controller)('medical-records'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [medical_records_service_1.MedicalRecordsService])
], MedicalRecordsController);
//# sourceMappingURL=medical-records.controller.js.map