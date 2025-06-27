
export interface ResponseHttpDTO<T>{
        status: string;
        code: number;
        message: string;
        data: T
}