import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Like, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ResponseTaskDto } from './dtos/response-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dtos/update-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
        const { name, description, status } = createTaskDto;
        const task = this.create();
        task.name = name;
        task.description = description ?? null;
        task.status = status ?? false;
        try {
            await task.save();
            return new ResponseTaskDto(
                task.id,
                task.name,
                task.status,
                task.createdAt,
                task.updatedAt,
                task.description,
            );
        } catch (err) {
            throw new InternalServerErrorException('Erro to save task');
        }
    }

    async findTaskById(id: number): Promise<Task> {
        const task = await this.findOne(id, {
            select: [
                'id',
                'name',
                'description',
                'status',
                'createdAt',
                'updatedAt',
            ],
        });
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    async findAllTasks(): Promise<Task[]> {
        return await this.find({
            select: ['id', 'name', 'status', 'createdAt', 'updatedAt'],
        });
    }

    async findAllTasksByName(name: string): Promise<Task[]> {
        return await this.find({
            name: Like(`%${name}%`),
        });
    }

    async updateTask(
        task: Task,
        { name, description, status }: UpdateTaskDto,
    ): Promise<ResponseTaskDto> {
        task.name = name ?? task.name;
        task.description = description ?? task.description;
        task.status = status ?? task.status;
        try {
            await task.save();
            return new ResponseTaskDto(
                task.id,
                task.name,
                task.status,
                task.createdAt,
                task.updatedAt,
                task.description,
            );
        } catch (err) {
            throw new InternalServerErrorException('Error to update task');
        }
    }

    async deleteTask(id: number): Promise<number> {
        const result = await this.delete({ id: id });
        return result.affected;
    }
}
