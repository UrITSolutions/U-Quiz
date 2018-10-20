import { User } from "./model.user";

export class Response {
    user: User;
    responses: [{ answer: Number }];

    constructor(index) {
        this.user = {
            name: '',
            phone: '',
            church: '',
        }
        for(let i = 0; i <= index; i++){
            this.responses[i] = { answer: new Number() }
        }
    }
}