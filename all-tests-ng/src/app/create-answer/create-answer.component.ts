import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {AnswerData} from "../AnswerData";
import {TestCreatingService} from "../test-creating.service";

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {

  constructor(private TCServ: TestCreatingService) { }

  submited: boolean = false;

  answerData: AnswerData = {
    "id": 0,
    "question_id": 0,
    "scale_id": 0,
    "text": "",
    "impact_type": "",
    "impact_value": 0
  }

  @Output() newAnswerEvent = new EventEmitter<AnswerData>();

  ngOnInit(): void {
  }

  changeAnswerText(text: string): void {
    this.answerData.text = text;
  }

  changeAnswerImpactType(it: string): void {
    this.answerData.impact_type = it;
  }

  changeAnswerImpactValue(iv: string): void {
    this.answerData.impact_value = toNumbers(iv)[0];
  }

  submit() {
    let ds: AnswerData = {
      "id": this.answerData.id,
      "question_id": this.answerData.question_id,
      "scale_id": this.answerData.scale_id,
      "text": this.answerData.text,
      "impact_type": this.answerData.impact_type,
      "impact_value": this.answerData.impact_value
    }
    this.newAnswerEvent.emit(ds);
    this.submited = true;
  }

}
