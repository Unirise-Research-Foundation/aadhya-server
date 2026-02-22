import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  Version,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller({
  path: 'persons',
  version: '1',
})
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('my-children')
  @Version('1')
  @UseGuards(RolesGuard)
  @Roles('educator')
  async getMyChildren(@CurrentUser() user: any) {
    return this.personService.getMyChildren(user.id);
  }

  @Post('add-child')
  @Version('1')
  @UseGuards(RolesGuard)
  @Roles('educator')
  async addChild(@CurrentUser() user: any, @Body() dto: CreatePersonDto) {
    return this.personService.addChild(user.id, dto);
  }

  @Get()
  @Version('1')
  async getAllPersons(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.personService.getAllPersons(page, limit);
  }

  @Get(':personId')
  @Version('1')
  async getPersonById(@Param('personId', new ParseUUIDPipe()) personId: string) {
    return this.personService.getPersonById(personId);
  }

  @Post()
  @Version('1')
  async createPerson(@Body() dto: CreatePersonDto) {
    return this.personService.createPerson(dto);
  }

  @Put(':personId')
  @Version('1')
  async updatePerson(
    @Param('personId') personId: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.updatePerson(personId, updatePersonDto);
  }

  @Delete(':personId')
  @Version('1')
  async softDeletePerson(@Param('personId') personId: string) {
    return this.personService.softDeletePerson(personId);
  }
}
