import { Request, Response, NextFunction } from 'express';

export function addCacheControlHeader(_req: Request, res: Response, next: NextFunction) {
	res.set('Cache-Control', 'no-cache');
	next();
}

export function enableCORS(_req: Request, res: Response, next: NextFunction) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
}
