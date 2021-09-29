import {
  Column, PrimaryGeneratedColumn,
  Entity, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';
import User from '@models/mysql/users/user.model';

@Entity()
export default class UserRelationShips extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => SiteInfo, (siteInfo) => siteInfo.id)
  @JoinColumn()
  siteInfo!: SiteInfo;

  @OneToOne(() => User, (sourceUser) => sourceUser.id)
  sourceUser!: User;

  @OneToOne(() => User, (targetUser) => targetUser.id)
  targetUser!: User;

  @Column()
  status!: string;

  // NOTE 이하 관리용

  @Column({ type: 'text', nullable: true })
  memo!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
