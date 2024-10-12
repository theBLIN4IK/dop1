export class ApiError extends Error {
	status
	errors

	constructor(status, message, errors) {
		super(message)
		this.status = status
		this.errors = errors
		Object.setPrototypeOf(this, ApiError.prototype)
	}

	static UnauthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован')
	}

	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors)
	}
}
