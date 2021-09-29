import {
  Column, Entity, BaseEntity, OneToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn,
} from 'typeorm';

import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';
import User from '@models/mysql/users/user.model';

@Entity()
export default class PostMappers extends BaseEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', length: 200 })
  postId!: string;

  @OneToOne(() => SiteInfo, (siteInfo) => siteInfo.id)
  @JoinColumn()
  siteInfo!: SiteInfo;

  @OneToOne(() => User, (writer) => writer.id)
  @JoinColumn()
  writer!: User;

  @Column()
  likeCount!: number;

  @Column()
  bookmarkCount!: number;

  @Column()
  commentCount!: number;

  // NOTE 이하 관리용

  @Column({ type: 'text', nullable: true })
  memo!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
