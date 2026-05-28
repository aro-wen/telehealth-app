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
exports.MedicalRecordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MedicalRecordsService = class MedicalRecordsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRecord(doctorId, dto) {
        const appointment = await this.prisma.appointment.findFirst({
            where: { id: dto.appointmentId, doctorId },
            include: { patient: true },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found or access denied');
        }
        return this.prisma.medicalRecord.upsert({
            where: { appointmentId: dto.appointmentId },
            update: {
                diagnosis: dto.diagnosis,
                prescriptions: dto.prescriptions,
                doctorNotes: dto.doctorNotes,
            },
            create: {
                appointmentId: dto.appointmentId,
                patientId: appointment.patientId,
                diagnosis: dto.diagnosis,
                prescriptions: dto.prescriptions,
                doctorNotes: dto.doctorNotes,
            },
        });
    }
    async getPatientRecords(patientId) {
        return this.prisma.medicalRecord.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
            include: {
                appointment: {
                    select: {
                        id: true,
                        startAt: true,
                        doctor: {
                            select: {
                                email: true,
                                doctorProfile: { select: { fullName: true } },
                            },
                        },
                    },
                },
            },
        });
    }
};
exports.MedicalRecordsService = MedicalRecordsService;
exports.MedicalRecordsService = MedicalRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicalRecordsService);
//# sourceMappingURL=medical-records.service.js.map