import { LearningField } from "./LearningField";
import { Question } from "./Question";

export class OpenAnswerQuestion extends Question{
    rightAnswer: string;

    constructor(id:number, question: string,  rightAnswer: string, learningField: LearningField, step: number){
        super();
        this.id = id;
        this.question = question; 
        this.step = step; 
        this.rightAnswer = rightAnswer; 
        this.learningField = learningField;
    }
}