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
exports.DoctorDiscoveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const SYMPTOM_MAP = {
    headache: ['General Practice', 'Neurology'],
    fever: ['General Practice', 'Infectious Disease'],
    cough: ['General Practice', 'Pulmonology'],
    chest: ['Cardiology', 'Pulmonology'],
    stomach: ['Gastroenterology', 'General Practice'],
    skin: ['Dermatology'],
    mental: ['Psychiatry', 'Psychology'],
    anxiety: ['Psychiatry', 'Psychology'],
    depression: ['Psychiatry', 'Psychology'],
    joint: ['Orthopedics', 'Rheumatology'],
    back: ['Orthopedics', 'Neurology'],
};
let DoctorDiscoveryService = class DoctorDiscoveryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDoctors(params) {
        const where = {};
        if (params.specialization)
            where.specialization = {
                contains: params.specialization,
                mode: 'insensitive',
            };
        return this.prisma.doctorProfile.findMany({
            where,
            select: {
                id: true,
                fullName: true,
                specialization: true,
                bio: true,
                licenseNumber: true,
                profilePictureUrl: true,
                isVerified: true,
                user: { select: { email: true } },
            },
        });
    }
    recommendSpecialization(symptoms) {
        const lower = symptoms.toLowerCase();
        const matches = Object.entries(SYMPTOM_MAP)
            .filter(([key]) => lower.includes(key))
            .flatMap(([, specs]) => specs);
        return matches.length ? [...new Set(matches)] : ['General Practice'];
    }
};
exports.DoctorDiscoveryService = DoctorDiscoveryService;
exports.DoctorDiscoveryService = DoctorDiscoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoctorDiscoveryService);
//# sourceMappingURL=doctor-discovery.service.js.map