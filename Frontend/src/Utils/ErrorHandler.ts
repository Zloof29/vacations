class ErrorHandler {

	public getError(err: any): string {
        if(typeof err === "string") return err;
        if(typeof err?.response?.data === "string") return err.response.data;
        if(typeof err?.message === "string") return err.message;
        return "Unknown error.";
    }

}

export const errorHandler = new ErrorHandler();
