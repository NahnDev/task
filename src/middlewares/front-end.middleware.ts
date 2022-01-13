import { Injectable, NestMiddleware } from '@nestjs/common';
import path from 'path';
import { ROUTE_PREFIX } from 'src/main';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) =>
  path.resolve(process.cwd(), 'client', `${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log('asf');
    const { url } = req;
    if (url.indexOf(ROUTE_PREFIX) === 1) {
      next();
    } else if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
      res.sendFile(resolvePath(url));
    } else {
      res.sendFile(resolvePath('index.html'));
    }
  }
}
