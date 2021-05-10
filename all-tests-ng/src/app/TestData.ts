import {QuestionData} from "./QuestionData";
import {GuestData} from "./GuestData";
import {ScaleData} from "./ScaleData";

export interface TestData {
  id: number
  created_by: number
  name: string
  token: string
  questions: QuestionData[]
  guests: GuestData[]
}
