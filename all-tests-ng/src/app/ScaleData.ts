import {AnswerData} from "./AnswerData";

export interface ScaleData{
  id: number
  test_id: number
  name: string
  answers: AnswerData[]
}
