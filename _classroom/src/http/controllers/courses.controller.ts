import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUserDTO } from 'src/interfaces/auth-user';
import { CreateCourse } from 'src/interfaces/create-course';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser } from '../auth/current-user';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';

@ApiTags('Course')
@ApiBearerAuth()
@Controller('api/v1/courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Show all courses' })
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Get(':courseId')
  @ApiOperation({ summary: 'Show course by they id' })
  @UseGuards(AuthorizationGuard)
  async course(
    @Param('courseId') courseId: string,
    @CurrentUser() user: AuthUserDTO,
  ) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);
    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId,
      studentId: student.id,
    });
    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return await this.coursesService.findCourseById(courseId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a course' })
  @UseGuards(AuthorizationGuard)
  async createCourse(@Body() data: CreateCourse) {
    return await this.coursesService.createCourse(data);
  }
}
