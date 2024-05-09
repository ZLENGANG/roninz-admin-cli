import { CliAnswers, ConvertVueParams } from "../type";

export class ConvertVue {
  private readonly path: string;
  private readonly fileName: string;
  private readonly answers: CliAnswers;
  private readonly model: string[];

  constructor(params: ConvertVueParams) {
    const { path, fileName, answers, model } = params;
    this.path = path;
    this.fileName = fileName;
    this.answers = answers;
    this.model = model;
  }

  init() {
    const js = this.readJsFile();
    return js;
  }

  readJsFile() {
    const { tempPath, ui } = this.answers;
    const fileName =
      this.fileName + (tempPath.indexOf("_ts") > -1 ? ".ts" : ".js");
  }

  private async _readTemp(fileName: string, path: string) {
    // const 
  }
}
