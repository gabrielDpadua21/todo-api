import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';

@Entity('tb_tasks')
export class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, type: 'varchar', length: 200 })
	name: string;

	@Column({ nullable: true, type: 'varchar' })
	description: string;

	@Column({ nullable: false, default: false })
	status: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
