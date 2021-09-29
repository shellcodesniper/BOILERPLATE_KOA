import {
  Column, PrimaryGeneratedColumn,
  Entity, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SiteInfo, (siteInfo) => siteInfo.id)
  // @JoinColumn()
  siteInfo!: SiteInfo;

  @Column({ type: 'varchar', length: 255 })
  platformType!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'text', nullable: false })
  hash!: string;

  @Column({ type: 'text', nullable: false })
  salt!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nickname!: string;

  @Column({ type: 'varchar', length: 255 })
  pn!: string;

  @Column()
  lastLogin!: Date;

  @Column()
  lastActivity!: Date;

  @Column({ type: 'text', nullable: false })
  profileText!: string;

  @Column({ type: 'double', scale: 2 })
  score!: number;

  @Column()
  point!: number;

  @Column()
  isActive!: boolean;

  // NOTE 이하 관리용

  @Column({ type: 'text', nullable: true })
  memo!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
