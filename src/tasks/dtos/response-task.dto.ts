export class ResponseTaskDto {
    id: number;
    name: string;
    description?: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        name: string,
        status: boolean,
        createdAt: Date,
        updatedAt: Date,
        description?: string,
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.description = description;
    }
}
