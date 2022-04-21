import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourse {
  title: string;
  slug: string;
}

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

  async findCourseById(id: string) {
    const user = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Course not found!', HttpStatus.NOT_FOUND);
    }
  }

  async createCourse({ title }: CreateCourse) {
    const slug = slugify(title, { lower: true });
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
