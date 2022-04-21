import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser } from '../auth/current-user';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';

@Controller('api/v1/students')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @Get('me')
  @UseGuards(AuthorizationGuard)
  student(@CurrentUser() user) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @Get(':studentId')
  @UseGuards(AuthorizationGuard)
  enrollments(@Param('studentId') studentId: string) {
    return this.enrollmentsService.listEnrollmentsByStudent(studentId);
  }
}
