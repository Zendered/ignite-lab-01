import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';

@ApiTags('Enrollment')
@ApiBearerAuth()
@Controller('api/v1/enrollments')
export class EnrollmentsController {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Show all enrollments' })
  @UseGuards(AuthorizationGuard)
  curses() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Show student by id' })
  @UseGuards(AuthorizationGuard)
  async student(@Param('studentId') studentId: string) {
    return await this.studentsService.findStudentById(studentId);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Show course by id' })
  @UseGuards(AuthorizationGuard)
  async course(@Param('courseId') courseId: string) {
    return await this.coursesService.findCourseById(courseId);
  }
}
