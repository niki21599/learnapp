import { LearningField } from "./LearningField";
import { Question } from "./Question";

export class MultipleAnswerQuestion extends Question{
    
    possibleAnswers: string[];
    rightAnswers: number[];

    constructor(id: number, question: string, possibleAnswers: string[], rightAnswers: number[], learningField: LearningField, step: number){
        super();
        this.id = id; 
        this.question = question; 
        this.step = step; 
        this.possibleAnswers = possibleAnswers; 
        this.rightAnswers = rightAnswers; 
        this.learningField = learningField;
    }
}