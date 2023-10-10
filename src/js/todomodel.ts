export interface TodoItem {
    text: string,
    completed: boolean,
    id: string
}

export default class Todo implements TodoItem {
    constructor(
        public text: string = '',
        public completed: boolean = false,
        public id: string = ''
    ) {}

    
}