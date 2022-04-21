import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { CoursesController } from './controllers/courses.controller';
import { EnrollmentsController } from './controllers/enrollments.controller';
import { StudentsController } from './controllers/students.controller';
import { CoursesService } from './services/courses.service';
import { EnrollmentsService } from './services/enrollments.service';
import { StudentsService } from './services/students.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [CoursesController, StudentsController, EnrollmentsController],
  providers: [CoursesService, StudentsService, EnrollmentsService],
})
export class HttpModule {}
