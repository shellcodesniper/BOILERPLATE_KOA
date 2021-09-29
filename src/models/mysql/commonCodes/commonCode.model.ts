import {
  Column, PrimaryGeneratedColumn,
  Entity, BaseEntity, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class CommonCodes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  group!: string;

  @Column()
  code!: string;

  @Column()
  value!: string;

  @Column()
  description!: string;

  // NOTE 이하 관리용

  @Column({ type: 'text', nullable: true })
  memo!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
