import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from '@src/schedule/schedule.service';
import { CreateScheduleDto } from '@src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from '@src/schedule/dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  /**
   * Create new collection item.
   */
  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }
  /**
   * List all collection items.
   */
  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }
  /**
   * List one collection item.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }
  /**
   * Update one collection item.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }
  /**
   * Delete one collection item.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
