
export interface ResponseErrorHttpDTO{
        status: string;
        httpCode: number;
        url: string;
        httpMethod: string,        
        message: string;
        backendMessage: string;
        timestamp: string;
        datails: string[] | null;
}