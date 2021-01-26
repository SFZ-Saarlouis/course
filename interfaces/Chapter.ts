export interface Page {
    name: string;
    content: boolean;
    path: string;
}

export interface Chapter {
    name: string;
    pages: Page[];
}
