import { Request, Response, NextFunction } from 'express';
import {
	addCacheControlHeader,
	enableCORS,
	requireBasicAuth,
	addAuthHeader
} from '../../src/infra/middlewares';

describe('Middleware Tests', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: NextFunction;

	beforeEach(() => {
		req = {};
		res = {
			setHeader: jest.fn(),
			set: jest.fn(),
			status: jest.fn().mockReturnThis(),
			send: jest.fn()
		};
		next = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('addCacheControlHeader', () => {
		test('should set Cache-Control header to no-cache', () => {
			addCacheControlHeader(req as Request, res as Response, next);
			expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-cache');
			expect(next).toHaveBeenCalled();
		});
	});

	describe('enableCORS', () => {
		test('should set Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers headers', () => {
			enableCORS(req as Request, res as Response, next);
			expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
			expect(res.setHeader).toHaveBeenCalledWith(
				'Access-Control-Allow-Methods',
				'GET, POST, PUT, DELETE'
			);
			expect(res.setHeader).toHaveBeenCalledWith(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept'
			);
			expect(next).toHaveBeenCalled();
		});
	});

	describe('requireBasicAuth', () => {
		test('should call next if Authorization header with basic authentication exists', () => {
			req.headers = { authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==' };
			requireBasicAuth(req as Request, res as Response, next);
			expect(next).toHaveBeenCalled();
		});

		test('should send 401 Unauthorized if Authorization header is missing', () => {
			requireBasicAuth(req as Request, res as Response, next);
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.send).toHaveBeenCalledWith('Unauthorized');
			expect(next).not.toHaveBeenCalled();
		});

		test('should send 401 Unauthorized if Authorization header does not contain basic authentication', () => {
			req.headers = { authorization: 'Bearer token' };
			requireBasicAuth(req as Request, res as Response, next);
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.send).toHaveBeenCalledWith('Unauthorized');
			expect(next).not.toHaveBeenCalled();
		});
	});

	describe('addAuthHeader', () => {
		test('should add Authorization header with the provided value', () => {
			const mockNext = jest.fn();
			const authValue = 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==';
			process.env.AUTH = 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==';

			addAuthHeader(req as Request, res as Response, mockNext);

			if (req.headers) {
				expect(req.headers.authorization).toBe(authValue);
			}
			expect(mockNext).toHaveBeenCalled();

			delete process.env.AUTH; // Clean up the environment variable
		});
	});
});
