import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dtos/update-task.dto';

const mockTaskRepository = () => ({
    createTask: jest.fn(),
    findTaskById: jest.fn(),
    updateTask: jest.fn(),
});

describe('Tasks Service Tests', () => {
    let service;
    let repository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: TaskRepository,
                    useFactory: mockTaskRepository,
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        repository = module.get<TaskRepository>(TaskRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Create Task', () => {
        let mockTaskDto: CreateTaskDto;

        beforeEach(() => {
            mockTaskDto = new CreateTaskDto('Mock Task');
        });

        it('Should create a task', async () => {
            repository.createTask.mockResolvedValue('mockTaskCreate');
            const task = await service.create(mockTaskDto);
            expect(repository.createTask).toHaveBeenCalledWith(mockTaskDto);
            expect(task).toEqual('mockTaskCreate');
        });
    });

    describe('Update Task', () => {
        let mockUpdateDto: UpdateTaskDto;
        let mockTask: Task;

        beforeEach(() => {
            mockUpdateDto = new UpdateTaskDto();
            mockTask = new Task();
            mockTask.id = 1;
        });

        it('Should update a task', async () => {
            repository.findTaskById.mockResolvedValue(mockTask);
            repository.updateTask.mockResolvedValue('mockUpdateTask');
            const task = await service.update(1, mockUpdateDto);
            expect(repository.findTaskById).toHaveBeenCalledWith(1);
            expect(repository.updateTask).toHaveBeenCalledWith(
                mockTask,
                mockUpdateDto,
            );
            expect(task).toEqual('mockUpdateTask');
        });
    });
});
