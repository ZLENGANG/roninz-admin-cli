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
  [key: string]: string | string[];
}

export interface CliAnswers {
  version: string;
  tempPath: string;
  ui: string;
  css: string;
  features: string[];
  model: string[];
  projectName?: string;

  eslint?: boolean;
  i18n?: boolean;
  echarts?: boolean;
  three?: boolean;

  [key: string]: any;
}

export interface ConvertVueParams {
  path: string;
  fileName: string;
  answers: CliAnswers;
  model: string[];
}
