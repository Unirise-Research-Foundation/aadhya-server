import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Version,
} from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Controller({
  path: 'assessments',
  version: '1',
})
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  @Version('1')
  async create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return await this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  @Version('1')
  async findAll() {
    return await this.assessmentsService.findAll();
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.assessmentsService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    return await this.assessmentsService.update(id, updateAssessmentDto);
  }

  @Delete(':id')
  @Version('1')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.assessmentsService.remove(id);
    return { message: 'Assessment deleted successfully' };
  }
}

