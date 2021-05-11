import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CreateAnswerComponent} from "../create-answer/create-answer.component";
import {QuestionData} from "../DataModels/QuestionData";
import {TestCreatingService} from "../test-creating.service";
import {QuestionCreatingService} from "../question-creating.service";
import {AnswerData} from "../DataModels/AnswerData";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
  providers: [QuestionCreatingService]
})
export class CreateQuestionComponent implements OnInit {

  constructor(private TCServ: TestCreatingService) { }

  public questionData: QuestionData = {
    "id": 0,
    "test_id": 0,
    "number": 0,
    "text": "",
    "answers": []
  }

  @Output() newQuestionEvent = new EventEmitter<QuestionData>();

  ngOnInit(): void {
  }

  addAnswer(data: AnswerData) {
    this.questionData.answers.push(data);
  }

  changeQuestionText(text: string) {
    this.questionData.text = text;
  }

  public submit() {
    let qd: QuestionData = {
      "id": this.questionData.id,
      "test_id": this.questionData.test_id,
      "number": this.questionData.number,
      "text": this.questionData.text,
      "answers": this.questionData.answers
    }
    this.newQuestionEvent.emit(qd);
    this.questionData = {
      "id": 0,
      "test_id": 0,
      "number": 0,
      "text": "",
      "answers": []
    }
  }
}
