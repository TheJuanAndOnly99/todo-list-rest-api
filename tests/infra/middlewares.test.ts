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
	});

	describe('addAuthHeader', () => {
    test('should add Authorization header with basic authentication', () => {
      const req: Partial<Request> = {
        headers: {}
      };
      const res = {} as Response;
      const next = jest.fn();

      addAuthHeader(req as Request, res, next);

      expect(req.headers?.authorization).toContain('Basic');
      expect(next).toHaveBeenCalled();
    });
  });
});
