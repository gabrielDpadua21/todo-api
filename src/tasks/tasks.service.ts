import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ResponseTaskDto } from './dtos/response-task.dto';
import { TaskRepository } from './task.repository';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './task.entity';

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

    async delete(id: number): Promise<{ status: number; message: string }> {
        const result = await this.taskRepository.deleteTask(id);
        if (result === 0) throw new NotFoundException('Task not found');
        return {
            status: result,
            message: 'Success',
        };
    }

    async findById(id: number): Promise<ResponseTaskDto> {
        const task = await this.taskRepository.findTaskById(id);
        return new ResponseTaskDto(
            task.id,
            task.name,
            task.status,
            task.createdAt,
            task.updatedAt,
            task.description,
        );
    }

    async findAll(): Promise<ResponseTaskDto[]> {
        const tasks = await this.taskRepository.findAllTasks();
        return tasks.map((task: Task) => {
            return new ResponseTaskDto(
                task.id,
                task.name,
                task.status,
                task.createdAt,
                task.updatedAt,
                task.description,
            );
        });
    }

    async findAllByName(name: string): Promise<ResponseTaskDto[]> {
        const tasks = await this.taskRepository.findAllTasksByName(name);
        return tasks.map((task: Task) => {
            return new ResponseTaskDto(
                task.id,
                task.name,
                task.status,
                task.createdAt,
                task.updatedAt,
                task.description,
            );
        });
    }
}
