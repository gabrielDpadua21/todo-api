export class ResponseTaskDto {
    name: string;
    description?: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        name: string,
        status: boolean,
        createdAt: Date,
        updatedAt: Date,
        description?: string,
    ) {
        this.name = name;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.description = description;
    }
}
