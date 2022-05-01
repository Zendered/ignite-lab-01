import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser } from '../auth/current-user';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('api/v1/student')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Show all students' })
  students() {
    return this.studentsService.listAllStudents();
  }

  @Get('me')
  @ApiOperation({ summary: 'Show student by his id' })
  @UseGuards(AuthorizationGuard)
  student(@CurrentUser() user) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @Get(':studentId')
  @ApiOperation({ summary: 'Show all enrollments from student by his id' })
  @UseGuards(AuthorizationGuard)
  enrollments(@Param('studentId') studentId: string) {
    return this.enrollmentsService.listEnrollmentsByStudent(studentId);
  }
}
