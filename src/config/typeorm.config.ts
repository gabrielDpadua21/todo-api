import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'Toor@1234',
    database: 'db_todo',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
