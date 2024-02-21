import { LearningField } from "./LearningField";

export class Video{
    id: number
    title: string; 
    isComplete: boolean; 
    url: string;
    learningField: LearningField; 

    constructor(id: number, title: string, learningField: LearningField, isComplete: boolean){
        this.id = id;
        this.title = title; 
        this.learningField = learningField; 
        this.isComplete = isComplete;
        this.url = "../../assets/videos/test_video.mp4";
    }

}