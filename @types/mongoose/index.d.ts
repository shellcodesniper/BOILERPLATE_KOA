import mongoose from 'mongoose';

declare module 'mongoose' {

  export var stockConnection: mongoose.Connection | null = mongoose.Connection;
  export var caramellaConnection: mongoose.Connection | null = mongoose.Connection;
  export var oceanConnection: mongoose.Connection | null = mongoose.Connection;
}
