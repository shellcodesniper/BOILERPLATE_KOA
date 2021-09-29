import {
  Column, PrimaryGeneratedColumn,
  Entity, BaseEntity, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class SiteInfos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // NOTE 이하 관리용

  @Column({ type: 'text', nullable: true })
  memo!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
