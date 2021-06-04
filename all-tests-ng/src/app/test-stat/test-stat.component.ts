import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {TestStatData} from "../DataModels/TestStatData";
import {TestData} from "../DataModels/TestData";
import {GuestData} from "../DataModels/GuestData";
import {GustScaleStatistic} from "../DataModels/GustScaleStatistic";
import {AnswerData} from "../DataModels/AnswerData";

@Component({
  selector: 'app-test-stat',
  templateUrl: './test-stat.component.html',
  styleUrls: ['./test-stat.component.scss']
})
export class TestStatComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  testStat: GuestData[];
  testData: TestData;

  guestScalesData: GustScaleStatistic[] = [];

  getTestScales(): string[] {
    let result: Set<string> = new Set<string>();

    for (let question of this.testData.questions) {
      for (let answer of question.answers) {
        result.add(answer.scale_name);
      }
    }
    return Array.from(result);
  }

  getAnswerScaleData(id: number): {
    "scale_name": string,
    "impact_type": string,
    "impact_value": number
  } {
    let answerScaleData = {
      "scale_name": 'default',
      "impact_type": '+',
      "impact_value": 0
    }

    for (let question of this.testData.questions) {
      for (let answer of question.answers) {
        if (answer.id == id) {
          answerScaleData.scale_name = answer.scale_name;
          answerScaleData.impact_type = answer.impact_type;
          answerScaleData.impact_value = answer.impact_value;
        }
      }
    }
    return answerScaleData;
  }

  getNewScaleValue(current: number, impact_type: string, impact_value: number): number {
    if (impact_type == "+") {
      return current + impact_value;
    }
    if (impact_type == "-") {
      return current - impact_value;
    }
    return current;
  }

  getValueByScale(scaleName: string, guestId: number): number {
    let result = 0;
    let guestAnswers: {"id": number}[] = [];
    for (let guest of this.testStat) {
      if (guest.id == guestId) {
        guestAnswers = guest.answers;
        break;
      }
    }
    for (let guestAnswer of guestAnswers) {
      let answerScaleData = this.getAnswerScaleData(guestAnswer.id);
      if (answerScaleData.scale_name == scaleName) {
        result = this.getNewScaleValue(result, answerScaleData.impact_type, answerScaleData.impact_value);
      }
    }
    return result;
  }

  getScalesValuesByGuest(guestId: number): {
    "scale_name": string,
    "scale_value": number
  }[]
  {
    let scalesValues: {
    "scale_name": string,
    "scale_value": number
    }[] = [];
    let scales = this.getTestScales();
    for (let scale of scales) {
      let value = this.getValueByScale(scale, guestId);
      let scaleValue = {
        "scale_name": scale,
        "scale_value": value
      }
      scalesValues.push(scaleValue);
    }
    return scalesValues;
  }

  getStatisticsByScales(guestsData: GuestData[]): GustScaleStatistic[] {
    let guestsScalesStat: GustScaleStatistic[] = [];
    for (let guestData of guestsData) {
      let scalesValues = this.getScalesValuesByGuest(guestData.id);
      let guestStat = {
        "guest_id": guestData.id,
        "guest_name": guestData.guest_name,
        "created_at": guestData.created_at,
        "scales": scalesValues
      }
      guestsScalesStat.push(guestStat);
    }
    return guestsScalesStat;
  }

  getStat(id: string) {
    this.api.getTest(id).subscribe((data: TestData) => this.testData = data);
    this.api.getTestStat(id).subscribe((data: GuestData[]) => {
      this.testStat = data;
      this.guestScalesData = this.getStatisticsByScales(data);
      console.log(this.guestScalesData);
    });
  }

  check() {
    console.log(this.getScalesValuesByGuest(4));
  }
}
