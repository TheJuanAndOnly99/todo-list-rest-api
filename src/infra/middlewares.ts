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

export function requireBasicAuth(req: Request, res: Response, next: NextFunction): void {
	const authHeader = req.headers.authorization;

	// Check if Authorization header exists and contains basic authentication
	if (!authHeader || !authHeader.startsWith('Basic ')) {
		res.status(401).send('Unauthorized');
		return;
	}
	next();
}

export function addAuthHeader(req: Request, _res: Response, next: NextFunction): void {
	req.headers.authorization = 'Basic ' + process.env.AUTH;
	next();
}
