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
    deleteTask: jest.fn(),
    findAllTasks: jest.fn(),
    findAllTasksByName: jest.fn(),
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

    describe('Delete Task', () => {
        let mockTask: Task;

        beforeEach(() => {
            mockTask = new Task();
            mockTask.id = 1;
        });

        it('Should delete a task', async () => {
            repository.deleteTask.mockResolvedValue(1);
            const result = await service.delete(1);
            expect(repository.deleteTask).toHaveBeenCalledWith(1);
            expect(result).toBeTruthy();
        });
    });

    describe('Find tasks', () => {
        let mockTask: Task;

        beforeEach(() => {
            mockTask = new Task();
            mockTask.id = 1;
            mockTask.name = 'mock';
        });

        it('Should find a task by id', async () => {
            repository.findTaskById.mockResolvedValue(mockTask);
            const task = await service.findById(1);
            expect(repository.findTaskById).toHaveBeenCalledWith(1);
            expect(task.id).toEqual(1);
        });

        it('Should find all tasks', async () => {
            repository.findAllTasks.mockResolvedValue([mockTask]);
            const tasks = await service.findAll();
            expect(repository.findAllTasks).toBeCalled();
            expect(tasks.length).toEqual(1);
        });

        it('Should find all tasks by name', async () => {
            repository.findAllTasksByName.mockResolvedValue([mockTask]);
            const tasks = await service.findAllByName('mock');
            expect(repository.findAllTasksByName).toHaveBeenCalledWith('mock');
            expect(tasks.length).toEqual(1);
        });
    });
});
