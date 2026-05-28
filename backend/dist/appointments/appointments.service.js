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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bookAppointment(patientId, dto) {
        const doctorUser = await this.prisma.user.findUnique({
            where: { email: dto.doctorEmail },
            include: { doctorProfile: true },
        });
        if (!doctorUser || !doctorUser.doctorProfile) {
            throw new common_1.NotFoundException('Doctor not found or profile incomplete');
        }
        const slot = await this.prisma.scheduleSlot.findFirst({
            where: {
                doctorProfileId: doctorUser.doctorProfile.id,
                startAt: new Date(dto.startAt),
                isAvailable: true,
                appointment: { is: null },
            },
        });
        if (!slot) {
            throw new common_1.ConflictException('This time slot is already booked or unavailable');
        }
        const appointment = await this.prisma.appointment.create({
            data: {
                patientId,
                doctorId: doctorUser.id,
                startAt: slot.startAt,
                endAt: slot.endAt,
                status: 'BOOKED',
                slotId: slot.id,
                meetingLink: `https://meet.jit.si/TeleHealth-${slot.id}`,
            },
        });
        await this.prisma.scheduleSlot.update({
            where: { id: slot.id },
            data: { isAvailable: false },
        });
        return appointment;
    }
    async getPatientAppointments(patientId) {
        return this.prisma.appointment.findMany({
            where: { patientId },
            orderBy: { startAt: 'desc' },
            include: {
                doctor: {
                    select: {
                        email: true,
                        doctorProfile: { select: { fullName: true, specialization: true } },
                    },
                },
            },
        });
    }
    async cancelAppointment(patientId, appointmentId) {
        const appointment = await this.prisma.appointment.findFirst({
            where: { id: appointmentId, patientId },
            include: { slot: true, doctor: true },
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        const updated = await this.prisma.appointment.update({
            where: { id: appointmentId },
            data: { status: 'CANCELLED' },
        });
        if (appointment.slot) {
            await this.prisma.scheduleSlot.update({
                where: { id: appointment.slot.id },
                data: { isAvailable: true },
            });
        }
        return updated;
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map