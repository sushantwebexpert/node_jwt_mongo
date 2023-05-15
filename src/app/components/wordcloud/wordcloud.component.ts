import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import * as WordCloud from "wordcloud";
declare var $: any;
import { EventsService } from "../../services/events.service";

@Component({
  selector: "app-wordcloud",
  templateUrl: "./wordcloud.component.html",
  styleUrls: ["./wordcloud.component.scss"],
})
export class WordcloudComponent implements OnInit {
  @Input() wcp_options: any;

  maskCanvas2: any;
  orgUrl2: any;
  maskImage: any;
  cImage: any;

  maskCanvas:any;

  cwidth: any = 900;
  cheight: any = 600;

  maskwidth: any;
  maskheight: any;

  option: any = {
    'gridSize': 1,
    'weightFactor': function(size:any) {
      return Math.pow(size, 2.3) * $('#canvas').width() / 1024;
    },
    'fontFamily': "'Fjalla One', sans-serif",
    'color': function(word:any, weight:any) {
        if (weight < 2) {
        return "#000000"; // red
      } else if (weight >= 2 && weight < 3) {
        return "#191783"; // yellow
      } else if (weight >= 3 && weight < 4) {
        return "#724d3b"; // green
      } else {
        return "#262626"; // blue
      }
    },
    'rotateRatio': 0.4,
    'minSize': 1,
    // 'drawOutOfBound': true,
    'shrinkToFit': true,
    'rotationSteps': 2,
    // 'backgroundColor': '#ffffff',

    // 'weightFactor' : function (size:any) {return Math.pow(size, 2.3) * 800 / 1024;},
    // 'fontFamily': "Arial, Helvetica, sans-serif",
    // 'fontWeight': 'bold',
    // 'color': function (word:any, weight:any) {return (weight > 11) ? '#f44222' : '#c44292';},
    // 'rotateRatio': 0.4,
    // 'rotationSteps': 2,
    // 'drawOutOfBound': true,
    // 'backgroundColor': '#ffffff',
    'list': [],
    'fileUrl': null
  };

  constructor(public events: EventsService) {
    this.events.subscribe("option:updated", (data: any) => {
      // this.wcp_options = data.option;
      this.option['list'] = data.option.list;
      this.option['fontWeight'] = data.option.fontWeight;
      this.option['fontFamily'] = data.option.fontFamily;
      this.option['backgroundColor'] = data.option.backgroundColor;
      this.option['fileUrl'] = data.option.fileUrl;
      this.makeRun();
    });
    this.events.subscribe("mask:updated", (data: any) => {
      this.maskImage = data.maskImage;
      this.orgUrl2 = data.orgUrl;
    
      this.cImage = new Image();
      this.cImage.src = this.maskImage;

      this.maskChange();
      // console.log(data);
    });
  }

  ngOnInit() { 

    this.maskCanvas = document.createElement("canvas");
    // this.maskCanvas.getContext("2d");
    // this.option["list"] = new Array(250).fill(this.$list2).flat();
  }

  makeRun() {
    // if (this.wcp_options.fileUrl != null) {
    //   this.maskChange();
    // }
    // console.log(this.option)
    this.run();
  }

  run() {
    var cw = this.cwidth;
    var ch = this.cheight;
    var options: any = {};

      // options = this.wcp_options;
      options = this.option;

      var $form = $("#form");
      var $canvas = $("#canvas");
      // var $loading = $("#loading");

      var $mask = <HTMLInputElement>document.getElementById("config-mask");

      // $loading.prop("hidden", false);

      var devicePixelRatio = 1;

      // Set the width and height
      var width = cw;
      var height = Math.floor(width * 0.65);
      var pixelWidth = width;
      var pixelHeight = height;

      $canvas.css({ width: "", height: "" });

      $canvas.attr("width", pixelWidth);
      $canvas.attr("height", pixelHeight);

      if (this.maskCanvas) {
        options.clearCanvas = false;

        /* Determine bgPixel by creating
             another canvas and fill the specified background color. */
        var bctx: any = document.createElement("canvas").getContext("2d");

        bctx.fillStyle = options.backgroundColor || "#fff";
        bctx.fillRect(0, 0, 1, 1);
        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

        var maskCanvasScaled: any = document.createElement("canvas");
        maskCanvasScaled.width = $canvas[0].width;
        maskCanvasScaled.height = $canvas[0].height;
         var ctx2: any = maskCanvasScaled.getContext("2d");

        ctx2.drawImage(
          this.maskCanvas,
          0,
          0,
          this.maskCanvas.width,
          this.maskCanvas.height,
          0,
          0,
          maskCanvasScaled.width,
          maskCanvasScaled.height
        );
console.log(this.maskCanvas)
console.log(this.maskCanvas.width)
console.log(this.maskCanvas.height)
console.log(maskCanvasScaled.width)
console.log(maskCanvasScaled.height)

        var imageData: any = ctx2.getImageData(0, 0, cw, ch);

        var newImageData: any = ctx2.createImageData(imageData);
        for (var i = 0; i < imageData.data.length; i += 4) {
          if (imageData.data[i + 3] > 128) {
            newImageData.data[i] = bgPixel[0];
            newImageData.data[i + 1] = bgPixel[1];
            newImageData.data[i + 2] = bgPixel[2];
            newImageData.data[i + 3] = bgPixel[3];
          } else {
            // This color must not be the same w/ the bgPixel.
            newImageData.data[i] = bgPixel[0];
            newImageData.data[i + 1] = bgPixel[1];
            newImageData.data[i + 2] = bgPixel[2];
            newImageData.data[i + 3] = bgPixel[3] ? bgPixel[3] - 1 : 0;
          }
        }

        ctx2.putImageData(newImageData, 0, 0);

        ctx2 = $canvas[0].getContext("2d");
        ctx2.drawImage(maskCanvasScaled, 0, 0);

    cw = maskCanvasScaled.width;
    ch = maskCanvasScaled.height;

        maskCanvasScaled =
          ctx2 =
          imageData =
          newImageData =
          bctx =
          bgPixel =
            undefined;
      }

    var ctx2 = $canvas[0].getContext("2d");
    var img2 = new Image();
    // img2.src = this.orgUrl2;
    img2.src = this.maskImage;

    img2.onload = function() {
      setTimeout(() => {
        ctx2.globalAlpha = 0.04;
        ctx2.drawImage(img2, 0, 0, cw , ch);
        console.log('ye hua',cw , ch)
        ctx2.globalAlpha = 1.0;
      },1000);
    }


// console.log(ctx2)
// console.log(cw)
// console.log(ch)
console.log(options);

      // setTimeout(() => {
        WordCloud($canvas[0], options);
      console.log('fir ye hua',cw , ch)

      // },1000);
  }

  maskChange() {
    // var img = new Image();
    // img.src = this.maskImage;

      // this.maskwidth = img.width;
      // this.maskheight = img.height;

    // img.onload = function readPixels() {
    this.cImage.onload = (img:any) => this.imgOnload();

    // img.onload = function() {
    //   this.imgOnload();
    // }
  
  }

  imgOnload() {
      // window.URL.revokeObjectURL(this.maskImage);

    let img = this.cImage;
    //console.log(img);


      this.maskwidth = img.width;
      this.maskheight = img.height;

      this.maskCanvas.width = img.width;
      this.maskCanvas.height = img.height;
      

      // this.maskCanvas = ;

      var ctx: any; 
      ctx = this.maskCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
// console.log(img.width, img.height);
      var imageData: any = ctx.getImageData(
        0,
        0,
        this.maskwidth,
        this.maskwidth
      );
      var newImageData: any = ctx.createImageData(imageData);

      for (var i = 0; i < imageData.data.length; i += 4) {
        var tone =
          imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
        var alpha = imageData.data[i + 3];

        if (alpha < 128 || tone > 128 * 3) {
          // Area not to draw
          newImageData.data[i] =
            newImageData.data[i + 1] =
            newImageData.data[i + 2] =
              255;
          newImageData.data[i + 3] = 0;
        } else {
          // Area to draw
          newImageData.data[i] =
            newImageData.data[i + 1] =
            newImageData.data[i + 2] =
              0;
          newImageData.data[i + 3] = 255;
        }
      }

      // maskCanvas =  maskCanvas;
      // maskCanvas;

      ctx.putImageData(newImageData, 0, 0);

      
  }


  downLoadMe() {
    var $canvas = $("#canvas");
    let canvasUrl = $canvas[0].toDataURL("image/jpeg", 1.0);
    // Create an anchor, and set the href value to our data URL
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;

    // This is the name of our downloaded file
    createEl.download = "download-this-canvas2";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
  }


}
