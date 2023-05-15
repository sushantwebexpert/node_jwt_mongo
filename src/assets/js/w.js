'use strict';

var option2 = {
  'gridSize': Math.round(16 * $('#canvas').width() / 1024),
  'weightFactor' : function (size) {return Math.pow(size, 2.3) * $('#canvas').width() / 1024;},
  'fontFamily': 'Times, serif',
  'color': function (word, weight) {return (weight === 12) ? '#f44222' : '#c44292';},
  'rotateRatio': 0.5,
  'rotationSteps': 2,
  'backgroundColor': '#ffe0e0' 
}



// console.log(option2);

// console.log((examples.love.option))
// $("#input-list2").val(JSON.stringify(examples.love.option))
var maskCanvas;

jQuery(function($) {
  var $form = $('#form');
  var $canvas = $('#canvas');
  var $loading = $('#loading');

  var $width = $('#config-width');
  var $height = $('#config-height');
  var $mask = $('#config-mask');
  var $dppx = $('#config-dppx');
  var $css = $('#config-css');
  var $webfontLink = $('#link-webfont');


  var $list2 = [
    ['Love', 12],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 5],
    ['Love', 8],
    ['Love', 5],
    ['Love', 5],
    ['Love', 2],
    ['Love', 2],
    ['Love', 4],
    ['Love', 4],
    ['Love', 4],
    ['Love', 5],
    ['Love', 6],
    ['Love', 8],
    ['Love', 8],
    ['Love', 8],
  ];


  if (!WordCloud.isSupported) {
    $('#not-supported').prop('hidden', false);
    $form.find('textarea, input, select, button').prop('disabled', true);
    return;
  }

  // // Update the default value if we are running in a hdppx device
  // if (('devicePixelRatio' in window) &&
  //     window.devicePixelRatio !== 1) {
  //   $dppx.val(window.devicePixelRatio);
  // }

  $canvas.on('wordcloudstop', function wordcloudstopped(evt) {
    $loading.prop('hidden', true);
  });

  // $form.on('submit', function formSubmit(evt) {
  //   evt.preventDefault();
  //   run();
  // });

  // Load the local image file, read it's pixels and transform it into a
  // black-and-white mask image on the canvas.
  $mask.on('change', function() {
    maskCanvas = null;

    var file = $mask[0].files[0];

    if (!file) {
      return;
    }

    var url = window.URL.createObjectURL(file);
    var img = new Image();
    img.src = url;

    img.onload = function readPixels() {
      window.URL.revokeObjectURL(url);

      maskCanvas = document.createElement('canvas');
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;

      var ctx = maskCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      var imageData = ctx.getImageData(
        0, 0, maskCanvas.width, maskCanvas.height);
      var newImageData = ctx.createImageData(imageData);

      for (var i = 0; i < imageData.data.length; i += 4) {
        var tone = imageData.data[i] +
          imageData.data[i + 1] +
          imageData.data[i + 2];
        var alpha = imageData.data[i + 3];

        if (alpha < 128 || tone > 128 * 3) {
          // Area not to draw
          newImageData.data[i] =
            newImageData.data[i + 1] =
            newImageData.data[i + 2] = 255;
          newImageData.data[i + 3] = 0;
        } else {
          // Area to draw
          newImageData.data[i] =
            newImageData.data[i + 1] =
            newImageData.data[i + 2] = 0;
          newImageData.data[i + 3] = 255;
        }
      }

      ctx.putImageData(newImageData, 0, 0);
    };
  });

if($mask.length > 0){
  if ($mask[0].files.length) {
    console.log('change');
    $mask.trigger('change');
  }

}

  var $examples = $('#examples');
  $examples.on('change', function loadExample(evt) {
    run();
    this.selectedIndex = 0;
    $examples.blur();
  });

  var run = function run() {
    $loading.prop('hidden', false);

    // Load web font
    $webfontLink.prop('href', $css.val());

    // devicePixelRatio
    var devicePixelRatio = parseFloat($dppx.val());

    // Set the width and height
    var width = $width.val() ? $width.val() : $('#canvas-container').width();
    var height = $height.val() ? $height.val() : Math.floor(width * 0.65);
    var pixelWidth = width;
    var pixelHeight = height;

    if (devicePixelRatio !== 1) {
      $canvas.css({'width': width + 'px', 'height': height + 'px'});

      pixelWidth *= devicePixelRatio;
      pixelHeight *= devicePixelRatio;
    } else {
      $canvas.css({'width': '', 'height': '' });
    }

    $canvas.attr('width', pixelWidth);
    $canvas.attr('height', pixelHeight);

    // Set the options object
    var options = {};

    options = option2;
    
    options.list = new Array(50).fill($list2).flat();

    if (maskCanvas) {
      options.clearCanvas = false;

      /* Determine bgPixel by creating
         another canvas and fill the specified background color. */
      var bctx = document.createElement('canvas').getContext('2d');

      bctx.fillStyle = options.backgroundColor || '#fff';
      bctx.fillRect(0, 0, 1, 1);
      var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

      var maskCanvasScaled =
        document.createElement('canvas');
      maskCanvasScaled.width = $canvas[0].width;
      maskCanvasScaled.height = $canvas[0].height;
      var ctx = maskCanvasScaled.getContext('2d');

      ctx.drawImage(maskCanvas,
        0, 0, maskCanvas.width, maskCanvas.height,
        0, 0, maskCanvasScaled.width, maskCanvasScaled.height);

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var newImageData = ctx.createImageData(imageData);
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
          newImageData.data[i + 3] = bgPixel[3] ? (bgPixel[3] - 1) : 0;
        }
      }

      ctx.putImageData(newImageData, 0, 0);

      ctx = $canvas[0].getContext('2d');
      ctx.drawImage(maskCanvasScaled, 0, 0);

      maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = undefined;
    }

    // All set, call the WordCloud()
    // Order matters here because the HTML canvas might by
    // set to display: none.
    console.log(options)
    WordCloud($canvas[0], options);
  };


  // var hashChanged = function hashChanged() {
  //   run();
  // }

  // $(window).on('hashchange', hashChanged);
  // hashChanged();
});
