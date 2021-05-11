import {AnswerData} from "./AnswerData";

export interface GuestData{
  id: number
  test_id: number
  guest_name: string
  created_at: string
  answers: {
    id: number
  }[]
}
