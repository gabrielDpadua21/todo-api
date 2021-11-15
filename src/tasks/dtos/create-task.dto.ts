export class CreateTaskDto {
    name: string;
    description?: string;
    status?: boolean;

    constructor(name: string, description?: string, status?: boolean) {
        this.name = name;
        this.description = description;
        this.status = status;
    }
}
