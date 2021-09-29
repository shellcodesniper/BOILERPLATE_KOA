import mongoose from 'mongoose';
import MONGO_UTIL from '@models/mongodb/mongoUtil';

const conn = MONGO_UTIL.getConnection();

export interface IAttach extends mongoose.Document {
  fileName: string;
  fileUrl: string;
  hash: string;

  // NOTE 관리용
  memo?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _doc: any;
}

const AttachSchema: mongoose.Schema<IAttach> = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  hash: String,
  memo: String,

}, {
  timestamps: true,
});
AttachSchema.index({ fileName: 1 });
AttachSchema.index({ fileUrl: 1 });
AttachSchema.index({ hash: 1 });

export default conn.model<IAttach>('Attaches', AttachSchema);
