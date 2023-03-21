export interface blogElementRequest {
    name: string;
    description: string;
    imagePath: string;
}

export interface blogElementResponse extends blogElementRequest {
    id: number;
}