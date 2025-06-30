import { DataPageable } from "./DataPageable";

export interface ContentData<T>{
    content: T,
    pageable: DataPageable
}