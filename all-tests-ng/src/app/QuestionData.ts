import {AnswerData} from "./AnswerData";

export interface QuestionData{
  id: number
  test_id: number
  number: number
  text: string
  answers: AnswerData[]
}
