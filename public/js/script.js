//Problem: No user interacyion causes no change to application
//Solution: User interaction causes changes appropriately

let color = $(".selected").css("background-color");
let $canvas = $("canvas");
let context = $canvas[0].getContext("2d");
let lastEvent;
let firstEvent;
let ft;
let multiple_lines = [];
let position_allgn;
let side;
let doubleSide;
let mouseDown = false;
let arr = [];
var pathLength = 0;
const mouse = {x: 0,  y: 0};
const last_mouse = {x: 0,  y: 0};
let curr_pos;
let firstTimeV = true, firstTimeH = true, secondTimeV = true, secondTimeH = true;
//When clicking on control list items
$(".controls").on("click", "li", function() {
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});

//When "New Color" is pressed
$("#revealColorSelect").click(function() {
  //Show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  let r = $("#red").val();
  let g = $("#green").val();
  let b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function() {
  //Append the color to the controls ul
  let $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});

//On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  pathLength = 0;
  mouseDown = true;
  firstEvent = e;
  ft = true;
}).mousemove(function(e) {
  //Draw lines
  if (mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.lineWidth = 8;
    if(ft){
      firstEvent = e;
      ft = false;
    }
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
    mouse.x = e.offsetX - lastEvent.offsetX;
    mouse.y = e.offsetY - lastEvent.offsetY;
    if(mouse.y < 0){
        mouse.y = mouse.y * (-1);
    } else if(mouse.x < 0){
        mouse.x = mouse.x * (-1);
    }
    console.log("mouse.x * mouse.y --> ", lastEvent.offsetX, " * ", lastEvent.offsetY)
    context.stroke();
    lastEvent = e;
    pathLength += distanceBetween(last_mouse, mouse);
    if(parseInt(mouse.x) < parseInt(mouse.y)){
      firstTimeH = true; secondTimeH = true;
      if(parseInt(mouse.x) == 1 && parseInt(mouse.y) == 2){
        curr_pos = 'vertical';
      } else if(firstTimeV){
        firstTimeV = false;
        curr_pos = 'vertical';
      } else if(secondTimeV){
        secondTimeV = false;
        curr_pos = 'vertical';
      }
      curr_pos = 'vertical';
    }else if(parseInt(mouse.x) > parseInt(mouse.y)){
      if(parseInt(mouse.x) == 2 && parseInt(mouse.y) == 1){
        firstTimeV = true; secondTimeV = true;
        curr_pos = 'horizontal';
      } else if(firstTimeH){
        firstTimeH = false;
        curr_pos = 'vertical';
      } else if(secondTimeH){
        secondTimeH = false;
        curr_pos = 'vertical';
      }
      curr_pos = 'horizontal';

    }
    arr.push({
      "position:":curr_pos,
      "length" : pathLength
    });
    console.log(arr);
  }
}).mouseup(function() {
  mouseDown = false;
  console.log("Distance ------ ", pathLength);
  // console.log("First: ", firstEvent.offsetX,firstEvent.offsetY);
  // console.log("Last: ", lastEvent.offsetX, lastEvent.offsetY);
  //get allign position;
  if(parseInt(lastEvent.offsetX - firstEvent.offsetX) < parseInt(lastEvent.offsetY - firstEvent.offsetY)){
    position_allgn = 'vertical';
  } else if(parseInt(lastEvent.offsetX - firstEvent.offsetX) < parseInt(firstEvent.offsetY - lastEvent.offsetY)){
    position_allgn = 'vertical';
  }else if(parseInt(lastEvent.offsetX - firstEvent.offsetX) > parseInt(lastEvent.offsetY - firstEvent.offsetY)){
    position_allgn = 'horizontal';
  } else if(parseInt(firstEvent.offsetX - lastEvent.offsetX) > parseInt(lastEvent.offsetY - firstEvent.offsetY)){
    position_allgn = 'horizontal';
  } else if(parseInt(lastEvent.offsetX - firstEvent.offsetX) === parseInt(lastEvent.offsetY - firstEvent.offsetY)){
    //90 degree angle;
    multiple_lines.push([{
      "1": "90 degree"
    }]);
  }
  //then get the height but just one line, and verify multiple combination line;
  if(position_allgn === 'vertical'){
    //30 diff is the max max for people who don't know how to draw :);
    side = parseInt(lastEvent.offsetY - firstEvent.offsetY);
    if(side < 0){
      side = side * (-1);
    }
    // console.log(position_allgn, side);
  } else if(position_allgn === 'horizontal'){
    side = parseInt(lastEvent.offsetX - firstEvent.offsetX);
    if(side < 0){
      side = side * (-1);
    }
    // console.log(position_allgn, side);
    //is 90 degree angle;
    if(parseInt(lastEvent.offsetY - firstEvent.offsetY) > 35){
      doubleSide = parseInt(lastEvent.offsetY - firstEvent.offsetY);
      if(doubleSide < 0){
        doubleSide = doubleSide * (-1);
      }
      // console.log("vertical", doubleSide);
    }
  }
}).mouseleave(function() {
  $canvas.mouseup();
});

function calculate() {
let imageData = context.getImageData(0, 0, $canvas[0].width, $canvas[0].height);
context.putImageData(imageData, 0, 0);
let colorIndices = getColorIndicesForCoord(50, 100, 900);
}

function clearCanvas() {
  return context.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
}

function predict(){

}

function getImage() {
  
}

function getColorIndicesForCoord(x, y, width) {
  let red = y * (width * 4) + x * 4;
  return red;
}

function distanceBetween(A, B) {
  let dx, dy;
    if(B.x === A.x){
      dx = A.x; 
    } else {
      dx = B.x - A.x; 
    }
    if(B.y === A.y){
      dy = A.y; 
    } else {
      dy = B.y - A.y; 
    }
    console.log("A: ", A, ", B: ", B);
    console.log("dx = ", dx, ", dy = ", dy, " ", " calc = ", (dx * dx + dy * dy) * 0.5);
    return (dx * dx + dy * dy) ** 0.5;
}

function addNewLine() {

}