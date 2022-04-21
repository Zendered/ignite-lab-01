import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Course } from '@prisma/client';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CoursesService } from '../services/courses.service';

@Controller('api/v1')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('courses')
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Get(':coursesId')
  @UseGuards(AuthorizationGuard)
  course(@Param('coursesId') coursesId) {
    return this.coursesService.findCourseById(coursesId);
  }

  @Post('courses')
  @UseGuards(AuthorizationGuard)
  async createCourse(@Body() data: Course) {
    return await this.coursesService.createCourse(data);
  }
}
