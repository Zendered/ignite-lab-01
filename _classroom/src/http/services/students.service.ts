import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateStudentParams } from 'src/interfaces/create-student';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAllStudents() {
    return this.prisma.student.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createStudent({ authUserId }: CreateStudentParams) {
    return await this.prisma.student.create({
      data: { authUserId },
    });
  }

  async findStudentById(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new HttpException('Student not found!', HttpStatus.BAD_REQUEST);
    }

    return student;
  }

  async getStudentByAuthUserId(authUserId: string) {
    const student = await this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });

    if (!student) {
      throw new HttpException('Student not found!', HttpStatus.BAD_REQUEST);
    }

    return student;
  }
}
