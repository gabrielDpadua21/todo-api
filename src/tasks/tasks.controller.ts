import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ResponseTaskDto } from './dtos/response-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Post()
    async create(
        @Body() createTaskDto: CreateTaskDto,
    ): Promise<ResponseTaskDto> {
        return this.taskService.create(createTaskDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<ResponseTaskDto> {
        return this.taskService.update(id, updateTaskDto);
    }
}
