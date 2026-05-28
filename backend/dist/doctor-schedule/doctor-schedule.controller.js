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
exports.DoctorScheduleController = void 0;
const common_1 = require("@nestjs/common");
const doctor_schedule_service_1 = require("./doctor-schedule.service");
const create_schedule_dto_1 = require("./dto/create-schedule.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let DoctorScheduleController = class DoctorScheduleController {
    scheduleService;
    prisma;
    constructor(scheduleService, prisma) {
        this.scheduleService = scheduleService;
        this.prisma = prisma;
    }
    async getMySchedule(req) {
        if (req.user.role !== 'DOCTOR') {
            throw new common_1.ForbiddenException('Access denied: Doctors only');
        }
        const profile = await this.prisma.doctorProfile.findUnique({
            where: { userId: req.user.userId },
        });
        if (!profile)
            throw new common_1.ForbiddenException('Doctor profile not found.');
        return this.scheduleService.getSchedule(profile.id);
    }
    async setSlot(req, dto) {
        if (req.user.role !== 'DOCTOR') {
            throw new common_1.ForbiddenException('Access denied: Doctors only');
        }
        const profile = await this.prisma.doctorProfile.findUnique({
            where: { userId: req.user.userId },
        });
        if (!profile)
            throw new common_1.ForbiddenException('Doctor profile not found.');
        return this.scheduleService.manageSchedule(profile.id, dto);
    }
};
exports.DoctorScheduleController = DoctorScheduleController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "getMySchedule", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "setSlot", null);
exports.DoctorScheduleController = DoctorScheduleController = __decorate([
    (0, common_1.Controller)('doctor/schedule'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [doctor_schedule_service_1.DoctorScheduleService,
        prisma_service_1.PrismaService])
], DoctorScheduleController);
//# sourceMappingURL=doctor-schedule.controller.js.map