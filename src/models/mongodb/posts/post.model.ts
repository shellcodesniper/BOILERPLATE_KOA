import mongoose from 'mongoose';
import MONGO_UTIL from '@models/mongodb/mongoUtil';

const conn = MONGO_UTIL.getConnection();

export interface IPost extends mongoose.Document {
  siteInfoId: number;
  writerId: number;
  type: string;
  title: string;
  description: string;
  attachList: Array<string>;

  // NOTE 관리용
  memo: string;
  createdAt?: Date;
  updatedAt?: Date;
  _doc: any;
}

const PostSchema: mongoose.Schema<IPost> = new mongoose.Schema({
  siteInfoId: String,
  writerId: Number,
  type: String,
  title: String,
  description: String,
  attachList: [String],
}, {
  timestamps: true,
});
PostSchema.index({ siteInfoId: 1 });

PostSchema.index({ writerId: -1 });
PostSchema.index({ likeCnt: -1 });
PostSchema.index({ updatedAt: -1 });

export default conn.model<IPost>('Posts', PostSchema);
