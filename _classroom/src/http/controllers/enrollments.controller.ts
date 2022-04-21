import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';

@Controller('api/v1')
export class EnrollmentsController {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Get('enrollments')
  @UseGuards(AuthorizationGuard)
  curses() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @Get('student/:studentId')
  @UseGuards(AuthorizationGuard)
  async student(@Param('studentId') studentId: string) {
    return await this.studentsService.findStudentById(studentId);
  }

  @Get('course/:courseId')
  @UseGuards(AuthorizationGuard)
  async course(@Param('courseId') courseId: string) {
    console.log('id course:', courseId);

    return await this.coursesService.findCourseById(courseId);
  }
}
