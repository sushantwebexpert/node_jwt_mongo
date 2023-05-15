import { AfterViewInit, Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { WordcloudComponent } from '../../components/wordcloud/wordcloud.component';
import { WebcamComponent } from '../../components/webcam/webcam.component';
import { ThresholdComponent } from '../../components/threshold/threshold.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from "../../services/api.service";
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-word-cloud-maker',
  templateUrl: './word-cloud-maker.component.html',
  styleUrls: ['./word-cloud-maker.component.scss']
})

export class WordCloudMakerComponent implements AfterViewInit, OnDestroy {
  loading: any = false;
  dialogUp:any;
  section:any = 'home';
  template:any = 't1';
  imageLogo:any = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAAB3CAYAAADmW2fQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADc2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyZDI0ZWZmLTdkNmItNDA2Mi1iY2ZhLTBlYTU1ZWZiNjE0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRjNDQTU2MDdDRjExMUUzQkREODk1MjNBMkVBMjhGNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRjNDQTU1RjdDRjExMUUzQkREODk1MjNBMkVBMjhGNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OWU0OTAzNS1lZjEwLTQ4NjgtODMxYi1kYjgwNGI2ZWU1MzEiIHN0UmVmOmRvY3VtZW50SUQ9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';
  imageBg: any = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAAB3CAYAAADmW2fQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADc2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyZDI0ZWZmLTdkNmItNDA2Mi1iY2ZhLTBlYTU1ZWZiNjE0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRjNDQTU2MDdDRjExMUUzQkREODk1MjNBMkVBMjhGNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRjNDQTU1RjdDRjExMUUzQkREODk1MjNBMkVBMjhGNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OWU0OTAzNS1lZjEwLTQ4NjgtODMxYi1kYjgwNGI2ZWU1MzEiIHN0UmVmOmRvY3VtZW50SUQ9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';; 
  oldBgColor:any = "#ffffff";
  bGstyle:any = "background-color: #ffffff";
  paperSize:any = ['6x4 inch','8x8 inch','12x12 inch','A4'];
  imageCanvasBg: any = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAAB3CAYAAADmW2fQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADc2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyZDI0ZWZmLTdkNmItNDA2Mi1iY2ZhLTBlYTU1ZWZiNjE0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRjNDQTU2MDdDRjExMUUzQkREODk1MjNBMkVBMjhGNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRjNDQTU1RjdDRjExMUUzQkREODk1MjNBMkVBMjhGNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OWU0OTAzNS1lZjEwLTQ4NjgtODMxYi1kYjgwNGI2ZWU1MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YzJkMjRlZmYtN2Q2Yi00MDYyLWJjZmEtMGVhNTVlZmI2MTQ5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+r1r3tgAACk9JREFUeF7tnT126joUhQ9vLDgFixGIEUAaKtp0pkyadLdMl8aUoaNNRYMZQRgBiwJ5Ln4SmHtJQgiWjm3J2t96uo/cn8Sy9taRZPmokysIAOAs/xX/BwA4CkwKgOPcNNzNsqz4VIYudbvFRwCAMb+bNJvRIHqiTfHlzYiE5MejsioAwAYMdwFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMeBSQFwHJgUAMcJM6VnllEmJcn9npa7XfGbRNvtVv3ap37/+DX1ejS+uyOKIoq6Xa/Tk2bZmuRqqep7quc5us6qruN7Gg4DSsLqiQ7CMKlqjPXqlV7e57QpXZFzBIl4QhMl5kcPxJytZ/T68kTzknUWIqY/i2caXsluns2m9PD+1ey/058s6O2xoXvnqw60Sa8ik1yov6b/aqkiklwW36IZZC7TOBfiwrUxFREnedpsJS9yqPeF6y1dRPxj/WQiLv+bX4pI6r5h/uuglSZlE+mNxRmzyjSPKxDjJWP5YNK26KBdJq1IpLcVkce1R4kzqhbkl/Z02qQt00FrTFp3r/ljaaJzUnW/eC3c5axurpq0jTpoxSOYbDagaDQvv7hVBZsnigZTWhdfVs56Sh1V91rQdZvWVrPStFUH3pv00DBPTjTLPzZzGnXqMOqapnUZ9MR8RIOZyVGY1dJmHXhtUicb5i+qgQYzqk7OGc0GI/VT6mfz9ECv/x4rNk7rdVAMe3/G1Tmp6XXVXeK0uGBm6pqHMhf2OWkAOvA0kqoo8mCwwaIJ1PCQfxqn6v/SRAx1jTB04KVJs9kDOTu6ucD8hXnYu371qv5VEYoOPDTpml59U+jmiR7YFlsQRY+EowPvTJrNXvgXS4RQ/30u3GzeVzzRNFvRO5s2BcVJQqneZK6Kmv4civ4sZUppEutb4yRB6eAwM72GUwtHaR5f+lkG5biF65crVH+uhMq2MMGxhmS6ieBzEXlSYv+aTBO2HTw8C0dh6cAvk3KsaKrrKr+/UjcSgzkYXJrGF75vmWLcLuoe2P5sVVhMGpgOvDKprUiErUmsl/tjFQNssIwg1m0i88QyonKYNDQdeDQnzWhf/vXFf8QpfbwNiy8M6T7Sh1KIOXNa2jyOyfZkfgsEJQvb93u79LhI1HdqkvB04I9JrRZMYkptG+bE8I1s2me7t1g+kjvjZ4IiWRDLu9ZKoAsVThsjQB34Y1IrgT4TU9McGL6lqrnN2Oxk8ak8mXEIETS558sg0L2fNBdNA9SBNyY1F2hMf9jTdQxpbNo6273xoxi5M5SnmBCjR7VLadKQS0PUgTcmNRZoPGbtPU8MTVtnsyOzWGo+FxOTe+ZcU126OyXpqpkQdeCJSS0E2ouKT8wMx4ZDnS3ZTEtN6N9xR5CmCFMH/sxJjeCdi30mop7RkG9DFtNSAwRVoc/IrPIN4bcOPDGpJNNRTnXUPeQzvQd9ak0gDVQHLY+kbRIoMMdvHbTcpAD4D0wKgOPApAA4DkwKgOPApAA4DkwKgOPApAA4DkwKgOPApAA4DkwKgOPApAA4DkwKgOO03KT1v7sJXMRvHXhiUtN39qrEMmtdbbSpowpTBy2PpFW+YG36bqPpS9guCtQX/NaBJyY1f7F2bpXo9grrpeFZJHW/21iNQI1zDVkRpg68iaTG6Trmy0qOxTfPWmeKSwJtbqgfog68MWnXOEeFZdb4i1gcuyd6auBqhjMCZT3ZrRwh6sCfOWnUU6N4M+ajKatIbY7d40+veQu8As1W72oQ3RAh6qA4E+ZnjA+nsT2c6CuWhwUxnGh2wPKwHqvLsPrZXO1hd2iU/YFN4emgQpPynMd5jvVpWrYCsWwYe6NYnqrG0CCNt4EiNB1UalL24w8ZzqXUx96ZXJNUP9uuYVSxNgnD0YOG9deksf3ZnBwmDU0H1Zr0UEQeJ2mepjKX8nMpD9cJz8druuUKOE+5tvaoguWkb6F68jK3X6bWncOpsJg0MB109C/qH15hTdPOyHiC/DOCEvlR+ji+bDagyHRF7SKChOhT/8ui4XY7pw3r6khMaf5mfx5JNqNB9MSycCNETJM/z3Qfdan7tR2yjDK5oteXd5oz3ghlUvpgODgpKB0crHoV+yHW5SJys06Vqxett/BEEE1V7VFP4bsP4ejghkcwdR+n8BtDelYq9QvOY/e6dN/UuYNOEZAOCrNeh2Gi/r2YRlKNX70ox1z0M35GEV34IqkmDB3cZtJKboaNSRWVdBwVFH6HHmBZQGqg8JpUEYAObjRpFaKwNKnCfaFyb+g4p9m5qRBm957dpIq26+Bmk/JHU3uTamwfbFdXeOp3FevHY4ZFJHlqaIwqTKppsw5KmJS7x+ISsXSwgWow6Inah3vHuplqoSqTtlkHpUyq4bsRvEJ2ZshTdqMAA3XW/TS1cs+kR9qog9Im5eux+KON3hXSyPCvKDZb7mxh2a72S4nPVOeqSTVt04GBSY/Y91hVDQl1J1Jzb9pA9LyImqNybV37XL63lcsmPdIeHRib9IDe02l8I6oyaYE8NlKlPapqlMQJd56j6p3wRVURX35Jwn2TFrRAB3Ym/YsWhu7Fy9yMik16hh7+mHcmX4qq42FTtmve/IY8DoENI6v4JSp4Y9IzfNXBDRvszcmy67kku992ddfAYeO4pNV+Sbud3kB9LUeN3nDdo974ju6iiIZNXC8Lqs7rFa2WO3ov6rs53zWunKw6V1XXiarrPd0Pu79mDTDd4K5MyrLB3hqPdFCpSUF7WU87NDJ4NSpOc3qzfhUoLPzJcQQcwpfE4O0AJgUG1J0YPGxgUlAebxKDtwOYFJRmvTTM02GRczhkYNI2kq3VrLEishm9mHq0kZzD/gOTto31lAbRiKIBbyLoIxnNHszzK/Ux1jUCJm0RmTJoZzQ/mmgzp5E2KltIzZT/IzLP/RXTGI9ejIBJW8Jhc8HXB5faqNGAptZOVRF0EBk9F/1LPLbPlBgoMGkLuL77Z0PzUUSdQ1Qta1a9U0kNnzs2EfRIjDBqjt5xBHzF5E0Pvec0yVMpL26c15tRZXp8cYJtUzr3SQaBgW2B3nIcgrLmh64IbAW0A8NdL/HHoCqK0jMMagVM6h1rmvpiUH2UyOIRz0YtgUl9I9vT1guD6iC6KH3WD/gO5qQ+UjwPdZo4pRwTURYQSX1k+EbS5XNQ1DxUwqBswKSe0n38cNOo2qAfmIdyApN6zMGoaXxIfeICOjVKDoOyA5N6TlcNfT9kSkncoFVFTInM3chd1EJg0jbQHdLjm46qCdXrVUFxkqrh7RtWcSsEq7stJFvP6PXlieZVPaoRypx/FvR8Q1ZBYA9M2moyWs9WtHx/V4a1c6xQQ9r+ZEzP90PyNrOpp8CkIVHkmpW0p+Vyd/y97ZZOif/6/X7xiag3HtMdRRRFKlrClI0CkwLgOFg4AsBxYFIAHAcmBcBxYFIAnIbof4lt1tM7RYA1AAAAAElFTkSuQmCC';; 
  bGCanvasstyle:any = "background-color: #ffffff";
  items = [1, 2, 3, 4];
  public modalVisible = false;
  generated: Boolean = false;
  maskImage: any = null;
  orgImg: any = null;

  canvasText: any = '';
  canvasStyle: any = "background-color: #ffffff";

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  words: any = [];

  //alert 
  visible = false;
  dismissible = true;
  errMsg:any = '';
  //alert 

  fonts:any = ['Arial','Verdana','Trebuchet MS','Times New Roman','Courier New','Brush Script MT','Garamond'];
  fontw:any = ['normal','bold' ];




  option:any = {}

  // private trigger: Subject<any> = new Subject();
  // public webcamImage!: WebcamImage;
  // private nextWebcam: Subject<any> = new Subject();

  sysImage = '';

  templateForm = this.fb.group({
      background: ['color'],
      background_color: ['#ffffff'],
      background_img:<any> [''],
      company_logo:<any> [''],
      company_name: ['Company Name'],
      textlines: ['Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.']
   });

  canvasForm = this.fb.group({
      words: [''],
      background: ['color'],
      font: ['Arial'],
      font_weight: ['normal'],
      background_color: ['#ffffff'],
      background_img:<any> [''],
      papersize: ['A4'],
   });

  constructor(public events: EventsService,private api: ApiService,public dialog: MatDialog,private fb: FormBuilder, private el: ElementRef) {
      //console.log(this.templateForm.value.background_color);
  }

  ngAfterViewInit() {}
  ngOnDestroy() {}

  // Image Preview
  setImageLogo(event:any): void {
    if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = e => 
        // this.templateForm.controls['company_logo'].setValue(reader.result);
        this.imageLogo = reader.result;
        reader.readAsDataURL(file);
    }
  }

    // Image Preview
  setImageBg(event:any): void {
    if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = e => {
          this.imageBg = reader.result;
          this.bGstyle = "background: url("+ this.imageBg +")";
        }
        reader.readAsDataURL(file);
    }
  }

  setTemplate(t:any) { this.template = t; this.section = 'template'; }

  setSection(s:any) { this.section = s;     this.canvasChipText()  
}

  changeStyle() {
    if(this.templateForm.value.background == "image") {
      this.bGstyle = "background-color: #ffffff";
    }
    if(this.templateForm.value.background == "color") {
      this.bGstyle = "background-color: " + this.templateForm.value.background_color;
    }
  }

  // openCamera
  async openCamera() {
    const dialogRef = this.dialog.open(WebcamComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.maskImage = result;
        this.orgImg = this.maskImage;
        this.openThreshold();
        //console.log(`Dialog result: ${result}`);
      });
  }

  async openFile(event:any) {
    if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = e => {
          //console.log(reader.result);
          this.maskImage = reader.result;
          this.orgImg = this.maskImage;
          this.openThreshold();
        }
        reader.readAsDataURL(file);
    }
  }

    // Image Preview
  setCanvasImageBg(event:any): void {
    if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = e => {
          this.imageCanvasBg = reader.result;
          this.bGCanvasstyle = "background: url("+ this.imageCanvasBg +")";
        }
        reader.readAsDataURL(file);
    }
  }

  changeCanvasStyle() {
    if(this.canvasForm.value.background == "image") {
      this.bGCanvasstyle = "background-color: #ffffff";
    }
    if(this.canvasForm.value.background == "color") {
      this.bGCanvasstyle = "background-color: " + this.canvasForm.value.background_color;
    }
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our word
    if (value && this.words.length < 20 ) {
      this.words.push([value, Math.floor(Math.random() * 10) + 1]);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeChip(word: any): void {
    const index = this.words.indexOf(word);
    if (index >= 0) {
      this.words.splice(index, 1);
    }
  }

  editChip(word: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove word if it no longer has a name
    if (!value) {
      this.removeChip(word);
      return;
    }
    // Edit existing word
    const index = this.words.indexOf(word);
    if (index >= 0) {
      this.words[index] = value;
    }
  }

  canvasChipText() {
    // console.log(this.words);this.canvasText = '';
    // this.words.forEach( (element:any) => {
    //   this.canvasText += element.name + ' ';
    // });
    // console.log(this.canvasText)
  }



  // canvas action canvas section
  printMe() {
    this.generated = !this.generated;
    
  }

  // http://ec2-65-0-185-189.ap-south-1.compute.amazonaws.com/remove
  // file: (binary)
  // background: true

  loadingNow(t:Boolean) {

    if(true === t) {
        this.dialogUp = this.dialog.open(LoaderComponent);
    } 

    if(false === t) {
      this.dialog.closeAll();
    } 
  }

  saveCanvas(): any {
    
    this.visible = false;
    this.errMsg = '';

    // if( this.words.length < 20 ) {
    //   this.errMsg = 'Kindly provide 20 words';
    //   this.visible = true;
    //     return false;
    // }

    if( this.maskImage == null ) {
      this.errMsg = 'Kindly provide image';
      this.visible = true;
        return false;
    }

    this.loadingNow(true);

    // const formData: FormData = new FormData();
    // formData.append('file', this.maskImage);

    // this.api.removeBg(formData).subscribe((data:any)=> {

    this.loadingNow(false);
  var $list2 = [
    ['World', 5],
    ['Art', 4],
    ['Cloud', 4],
    ['World', 3],
    ['Cloud', 3],
    ['Love', 3],
    ['World', 2],
    ['Art', 2],
    ['Cloud', 2],
    ['Art', 2],
    ['World', 2],
    ['Cloud', 1],
    ['Art', 1],
    ['Love', 1],
    ['World', 1],
    ['Art', 1],
    ['Love', 1],
    ['Cloud', 1],
    ['World', 2],
    ['Love', 2],
    ['Cloud', 2],
    ['World', 2],
    ['Love', 2],
    ['Art', 3],
    ['World', 3],
    ['Love', 3],
    ['Art', 4],
    ['World', 4],
    ['Love', 5],
  ];

//start drawing
this.option["list"] = new Array(1000).fill($list2).flat();
// this.option["list"] = new Array(50).fill(this.words).flat();
this.option["fontWeight"] = this.canvasForm.value.font_weight;
this.option["fontFamily"] = this.canvasForm.value.font;
this.option["backgroundColor"] = this.canvasForm.value.background_color;
this.option['fileUrl'] = this.maskImage;
// this.option['orgUrl'] = this.orgImg;
// this.option['fileUrl'] = 'data:image/png;base64,' + data;
this.events.publish('option:updated',{'option': this.option});
//start drawing

    // });

  }


  removeBg() {

  }

    // openCamera
  async openThreshold() {
    const dialogRef = this.dialog.open(ThresholdComponent,{
      data: this.maskImage,
      disableClose: true
    });
      dialogRef.afterClosed().subscribe(result => {
        this.maskImage = result;
        this.events.publish('mask:updated',{'maskImage': this.maskImage,'orgUrl': this.orgImg});
        // console.log(`Dialog result: ${result}`);
      });
  }


}
