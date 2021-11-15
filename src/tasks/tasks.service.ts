import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ResponseTaskDto } from './dtos/response-task.dto';
import { TaskRepository } from './task.repository';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async create(createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async update(
        id: number,
        updateTaskDto: UpdateTaskDto,
    ): Promise<ResponseTaskDto> {
        const task = await this.taskRepository.findTaskById(id);
        return await this.taskRepository.updateTask(task, updateTaskDto);
    }
}
