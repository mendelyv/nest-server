import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogManager } from '../../system/log/log.manager';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const code = res.statusCode;
        next();
        // 组装日志信息
        const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;

        // 根据状态码写入不同日志
        if (code >= 500) {
            LogManager.error(logFormat);
        } else if (code >= 400) {
            LogManager.warn(logFormat);
        } else {
            LogManager.access(logFormat);
            LogManager.log(logFormat);
        }
    }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode;
  next();
  const logFormat = `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  if (code >= 500) {
    LogManager.error(logFormat);
  } else if (code >= 400) {
    LogManager.warn(logFormat);
  } else {
    LogManager.access(logFormat);
    LogManager.log(logFormat);
  }
}
