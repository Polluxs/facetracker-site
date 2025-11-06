// Generic API response structure
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: {
		message: string;
		code?: string;
		details?: Record<string, any>;
	};
}

// HTTP status codes
export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500
} as const;

// API endpoint response types
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

// Common API error types
export interface ValidationError {
	field: string;
	message: string;
}

export interface ApiError {
	message: string;
	code?: string;
	statusCode: number;
	validationErrors?: ValidationError[];
}

// Request/Response helpers
export type ApiRequest<T = Record<string, any>> = T;

export type ApiHandler<TRequest = any, TResponse = any> = (
	request: ApiRequest<TRequest>
) => Promise<ApiResponse<TResponse>>;

// Webhook types
export interface WebhookPayload {
	id: string;
	type: string;
	timestamp: number;
	data: Record<string, any>;
}