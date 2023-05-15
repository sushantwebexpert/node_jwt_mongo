import { Component, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { WebcamImage, WebcamInitError } from "ngx-webcam";

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnDestroy {
  readonly imageTrigger: Subject<void> = new Subject<void>();
  error?: string;

  constructor(
    private readonly dialogRef: MatDialogRef<WebcamComponent>
    ) {}

  captureImage(webcamImage: WebcamImage): void {
    this.dialogRef.close(webcamImage.imageAsDataUrl);
  }

  triggerSnapshot(): void {
    this.imageTrigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    console.warn(error);
    this.error = JSON.stringify(error);
  }

  ngOnDestroy(): void {
    this.imageTrigger.complete();
    console.log("ngOnDestroy completed");
  }
}
