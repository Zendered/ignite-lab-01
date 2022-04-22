import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';
import { CreateCourse } from 'src/interfaces/create-course';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCourseBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (!course) {
      throw new HttpException('Course not found!', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async findCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new HttpException('Course not found!', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourse) {
    const productWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new HttpException('Course already exists', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
