import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { GetByCoursesAndStudentIdParam } from 'src/interfaces/courseid-studentid';
import { CreateEnrollment } from 'src/interfaces/create-enrollment';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCoursesAndStudentIdParam) {
    const student = await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });

    if (!student) {
      throw new HttpException('Student not found!', HttpStatus.NOT_FOUND);
    }

    return student;
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollment) {
    const enrollment = await this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });

    return enrollment;
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
    });
  }
}
