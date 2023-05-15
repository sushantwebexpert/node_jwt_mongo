import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

declare var $: any;

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.scss']
})
export class ThresholdComponent implements OnInit {
  rValue: any = 50;
  style_left: any = `calc(50% + (0px))`;
  newImg:any = null;
  original: Boolean = true;
  canwidth = 500;
  canheight = 500;
constructor(
    private readonly dialogRef: MatDialogRef<ThresholdComponent>,@Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit() {
      setTimeout(() => {
        this.newImg = this.data;
        this.setImgSize();
        this.initVar();
    })

  }

  setImgSize() {
    var img = new Image();
    img.src = this.data;
    this.canheight = this.canwidth * img.height / img.width;
    this.setImg();
  }

  setImg() {
    var img = new Image();
    img.src = this.newImg;
    var c = <HTMLCanvasElement>document.getElementById("dearCanvas");
    var ctx:any = c.getContext("2d");
    ctx.canvas.height = this.canheight;
    ctx.drawImage(img, 0, 0, this.canwidth, this.canwidth * img.height / img.width);
  }



  showVal(event: any) {
    this.original = false;
    let v = event.target.value;
    this.rValue = Math.round( ( v / 255 ) * 100 );
    let range = event.target;
    const newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
      newPosition = 10 - (newValue * 0.2);
    this.style_left = `calc(${newValue}% + (${newPosition}px))`;
    this.filterImage( 'threshold', v );
  }

  showOriginal() {
    this.original = true;
  }


  closeMe(): void {
    this.dialogRef.close(this.newImg);
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy completed");
  }


fileToChange() {

  // const [file] = fileInput.files;

  // // displaying the uploaded image
  // imageToFilter = document.querySelector("#imageToFilter");
  // imageToFilter.src = await fileToDataUri(file);

  // // making the div containing the image visible
  // imagesDiv.style.visibility = "visible";

  // // applying the defaul filter
  // imageToFilter.addEventListener("load", () => {
  //   console.log(`ss2`)
  //   filteredImage.src = filterImage(imageToFilter, filter);
  // });

}










initVar() {
    // hiding the div that will contain the images
// const imagesDiv:any = document.querySelector("#images");
// const myRange:any = document.querySelector("#myRange");

// const fileInput:any = document.querySelector("#upload");

// let imageToFilter:any = null;
// const filteredImage:any = document.querySelector("#filteredImage");

// // initializing the filter value
// const filterElement:any = document.getElementsByName("filterRadio");
// let filter:any;
// filterElement.forEach((f:any) => {
//   if (f.checked) filter = f.value;
// });

// // applying the selected filter
// filterElement.forEach((f:any) => {
//   f.onclick = () => {
//     filter = f.value;
//     console.log(`ss`)
//     filteredImage.src = this.filterImage(imageToFilter, filter);
//   };
// });
// myRange.addEventListener("input", async (e:any) => {
//       console.log(e.target.value)
//   filteredImage.src = this.filterImage(imageToFilter, "threshold",e.target.value);
// });


// fileInput.addEventListener("change", async (e:any) => {
//   const [file] = fileInput.files;

//   // displaying the uploaded image
//   imageToFilter = document.querySelector("#imageToFilter");
//   imageToFilter.src = await this.fileToDataUri(file);

//   // making the div containing the image visible
//   imagesDiv.style.visibility = "visible";

//   // applying the defaul filter
//   imageToFilter.addEventListener("load", () => {
//     console.log(`ss2`)
//     filteredImage.src = this.filterImage(imageToFilter, filter);
//   });

//   return false;
// });
}

fileToDataUri(field:any) {
  return new Promise((resolve) => {
    const reader:any = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
}

filterImage(filter:any, threshold:any = 100) {

  let img = new Image(this.canwidth,this.canheight);
  img.src = this.data;
  const canvas = <HTMLCanvasElement>document.createElement("canvas");
  const context:any = canvas.getContext("2d");

  const canvasWidth:any = this.canwidth;
  const canvasHeight:any = this.canheight;

  canvas.width = this.canwidth;
  canvas.height = this.canheight;

  context.drawImage(img, 0, 0, canvasWidth, canvasHeight);

  const sourceImageData:any  = context.getImageData(0, 0, canvasWidth, canvasHeight);
  const blankOutputImageData:any  = context.createImageData(
    canvasWidth,
    canvasHeight
  );

  const outputImageData:any = this.applyFilter(
    sourceImageData,
    blankOutputImageData,
    filter,threshold
  );

  context.putImageData(outputImageData, 0, 0);

  this.newImg = canvas.toDataURL();
  this.setImg();
}

applyFilter(sourceImageData:any, outputImageData:any, filter:any, threshold:any = 100) {
  if (filter === "noFilter") {
    return sourceImageData;
  } else if (filter === "threshold") {
    return this.applyThreshold(sourceImageData, threshold);
  } else if (filter === "sharpen") {
    return this.applyConvolution(sourceImageData, outputImageData, [
      0,
      -1,
      0,
      -1,
      5,
      -1,
      0,
      -1,
      0
    ]);
  } else if (filter === "blur") {
    return this.applyConvolution(sourceImageData, outputImageData, [
      1 / 16,
      2 / 16,
      1 / 16,
      2 / 16,
      4 / 16,
      2 / 16,
      1 / 16,
      2 / 16,
      1 / 16
    ]);
  } else {
    return sourceImageData;
  }
}

applyThreshold(sourceImageData:any, threshold:any = 100) {
  const src = sourceImageData.data;
// console.log(src)
  for (let i = 0; i < src.length; i += 4) {
    const r = src[i];
    const g = src[i + 1];
    const b = src[i + 2];
    // thresholding the current value
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0;
    src[i] = src[i + 1] = src[i + 2] = v;
  }

  return sourceImageData;
}

  applyConvolution(sourceImageData:any, outputImageData:any, kernel:any) {
    const src:any = sourceImageData.data;
    const dst:any = outputImageData.data;

    const srcWidth:any = sourceImageData.width;
    const srcHeight:any = sourceImageData.height;

    const side:any = Math.round(Math.sqrt(kernel.length));
    const halfSide:any = Math.floor(side / 2);

    // padding the output by the convolution kernel
    const w:any = srcWidth;
    const h:any = srcHeight;

    // iterating through the output image pixels
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0;

        // calculating the weighed sum of the source image pixels that
        // fall under the convolution kernel
        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scy = y + cy - halfSide;
            const scx = x + cx - halfSide;

            if (scy >= 0 && scy < srcHeight && scx >= 0 && scx < srcWidth) {
              let srcOffset = (scy * srcWidth + scx) * 4;
              let wt = kernel[cy * side + cx];
              r += src[srcOffset] * wt;
              g += src[srcOffset + 1] * wt;
              b += src[srcOffset + 2] * wt;
              a += src[srcOffset + 3] * wt;
            }
          }
        }

        const dstOffset = (y * w + x) * 4;

        dst[dstOffset] = r;
        dst[dstOffset + 1] = g;
        dst[dstOffset + 2] = b;
        dst[dstOffset + 3] = a;
      }
    }
    return outputImageData;
  }

}
