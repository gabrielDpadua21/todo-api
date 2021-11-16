import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
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

    @Delete(':id')
    async delete(
        @Param('id') id: number,
    ): Promise<{ status: number; message: string }> {
        return this.taskService.delete(id);
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<ResponseTaskDto> {
        return this.taskService.findById(id);
    }

    @Get()
    async getAll(): Promise<ResponseTaskDto[]> {
        return this.taskService.findAll();
    }

    @Get('search/:name')
    async getAllByName(
        @Param('name') name: string,
    ): Promise<ResponseTaskDto[]> {
        return this.taskService.findAllByName(name);
    }
}
