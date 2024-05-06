// @ts-ignore
import { Question } from "inquirer";

export interface QuestionExtend extends Question {
  choices?: {
    name?: string;
    value?: string;
  }[];
  projectName?: string;
}

export interface AnyObject {
  [key: string]: string;
}
