
export interface ResponseHttp<T>{
        status: string;
        code: number;
        message: string;
        data?: T
}