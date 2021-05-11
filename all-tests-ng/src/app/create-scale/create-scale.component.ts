import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ScaleData} from "../DataModels/ScaleData";
import {AnswerData} from "../DataModels/AnswerData";
import {TestCreatingService} from "../test-creating.service";

@Component({
  selector: 'app-create-scale',
  templateUrl: './create-scale.component.html',
  styleUrls: ['./create-scale.component.scss']
})
export class CreateScaleComponent implements OnInit {

  constructor(private TCServ: TestCreatingService) { }

  scaleData: ScaleData = {
    "id": 0,
    "test_id": 0,
    "name": "",
    "answers": []
  }

  @Output() newScaleEvent = new EventEmitter<ScaleData>();

  ngOnInit(): void {
  }

  changeScaleName(name: string) {
    this.scaleData.name = name;
  }

  submit() {
    let sd: ScaleData = {
      "id": this.scaleData.id,
      "test_id": this.scaleData.test_id,
      "name": this.scaleData.name,
      "answers": this.scaleData.answers
    }
    this.newScaleEvent.emit(sd);
  }
}
