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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./appointments.service");
const book_appointment_dto_1 = require("./dto/book-appointment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AppointmentsController = class AppointmentsController {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    async book(req, dto) {
        if (req.user.role !== 'PATIENT') {
            throw new common_1.ForbiddenException('Only patients can book appointments');
        }
        return this.appointmentService.bookAppointment(req.user.userId, dto);
    }
    async getMyAppointments(req) {
        return this.appointmentService.getPatientAppointments(req.user.userId);
    }
    async cancel(req, id) {
        if (req.user.role !== 'PATIENT') {
            throw new common_1.ForbiddenException('Only patients can cancel appointments');
        }
        return this.appointmentService.cancelAppointment(req.user.userId, id);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_appointment_dto_1.BookAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "book", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getMyAppointments", null);
__decorate([
    (0, common_1.Put)('cancel/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "cancel", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map