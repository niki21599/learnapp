import { LearningField } from "./LearningField";

export class Question{
    id: number;
    question: string;
    learningField: LearningField; 
    step: number;
}