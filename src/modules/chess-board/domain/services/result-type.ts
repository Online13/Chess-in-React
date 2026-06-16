export class Result<T, E = never> {
	private readonly success: boolean;
	private readonly value?: T;
	private readonly error?: E;

	private constructor(success: boolean, value?: T, error?: E) {
		this.success = success;
		this.value = value;
		this.error = error;
	}

	static success<T>(value?: T): Result<T, never> {
		return new Result<T, never>(true, value, undefined);
	}

	static error<const E>(error: { code: E }): Result<never, E> {
		return new Result<never, E>(false, undefined, error.code);
	}

	// 🔍 Prédicat de type : affine le type vers un Result contenant du succès
	isSuccess(): this is Result<T, never> {
		return this.success;
	}

	// 🔍 Prédicat de type : affine le type vers un Result contenant une erreur
	isFailure(): this is Result<never, E> {
		return !this.success;
	}

	// Permet d'extraire la valeur en toute sécurité après un isSuccess()
	getValue(): T {
		return this.value as T;
	}

	// Permet d'extraire l'erreur en toute sécurité après un isFailure()
	getError(): E {
		return this.error as E;
	}
}
