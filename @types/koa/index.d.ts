import Koa from 'koa';
import { IJwtData } from '@src/utils/jwtUtil.interface';

declare module 'koa' {
  interface DefaultContext extends Koa.DefaultContextExtends {
    decoded?: IJwtData;
    [key: string]: any;
  }
}