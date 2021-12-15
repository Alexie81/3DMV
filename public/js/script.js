//Problem: No user interacyion causes no change to application
//Solution: User interaction causes changes appropriately
const path = require('path');
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
let lines = [];
var pathLength = 0;
const mouse = {x: 0,  y: 0};
const last_mouse = {x: 0,  y: 0};
let curr_pos;
let isFirst = true;
let firstTimeV = true, firstTimeH = true, secondTimeV = true, secondTimeH = true;
let text_to_send = "";
let volume;
let perimeter;
let area;
let cube = {
    "diff": 100,
    "l": 5
}
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
    // console.log("mouse.x * mouse.y --> ", lastEvent.offsetX, " * ", lastEvent.offsetY)
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
      "position":curr_pos,
      "length" : pathLength
    });
  }
}).mouseup(function() {
  mouseDown = false;
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
    side = lastEvent.offsetY - firstEvent.offsetY;
    if(side < 0){
      side = side * (-1);
    }
    // console.log(position_allgn, side);
  } else if(position_allgn === 'horizontal'){
    side = lastEvent.offsetX - firstEvent.offsetX;
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
  // context.putImageData(imageData, 0, 0);
  let n = arr.length;
  let current_poz;
  let nextLine;
  let controlIndex;
  let firstTimeTouchControlIndex = true;
  for(let i = 1; i < n; i++){
    if(i === 1){
        current_poz = arr[i].position;
        current_poz = arr[i].position;
    } else {
      if(arr[i].position !== current_poz){
        if(arr[i].position === current_poz){
          current_poz = current_poz;
        } else if(arr[i+1] && arr[i+1].position === current_poz){
          current_poz = current_poz;
        } else if(arr[i+2] && arr[i+2].position === current_poz){
          current_poz = current_poz;
        } else if(arr[i+3] && arr[i+3].position === current_poz ){
          current_poz = current_poz;
        } else if(arr[i+4] && arr[i+4].position === current_poz ){
          current_poz = current_poz;
        } else if(arr[i+5] && arr[i+5].position === current_poz ){
          current_poz = current_poz;
        } else {
          current_poz = arr[i].position;
          addNewLine(arr[i-1], i)
        }
      } else if(arr[i].position === current_poz) {
        if(firstTimeTouchControlIndex) {
          console.log(i)
          controlIndex = i;
          firstTimeTouchControlIndex = false;
        }
        if(i === (n-1)){
          let lenNLine = parseInt(arr[n-1].length) - parseInt(arr[controlIndex].length);
          let positionNLine = arr[n-1].position;
          let arrNLine = {
            "position": positionNLine,
            "length": lenNLine
          };
            addNewLine(arrNLine, (n-1));
        }
        current_poz = current_poz;
      }
    }
  }
  setTimeout(function(){redrawLinesDB()}, 1000);
  document.getElementById('calculate').disabled = true;
  let fHL = lines.find(x => x.position === "horizontal");
  let fVL = lines.find(x => x.position === "vertical");
  let horizontal_line = fHL;
  let vertical_line = fVL;

  if(horizontal_line.length - vertical_line.length > 60 || horizontal_line.length - vertical_line.length < -60){
    text_to_send = "This is not a cube!";
  } else {
    // calculate cube
    let l = 0;
    for(let i=0; i < lines.length; i++){
      if(lines[i].length < 30){
        lines.splice(i, 1);
      }
      if(lines[i].length > 40){
        l = lines[i].length;
        break;
      } else {
        l = lines[0].length;
        break;
      }
    }
    console.log("l = ", l)
    if(l!==0 && lines.length >= 4){
      volume = (Math.pow(l, 3)) * 0.0264583333;
      perimeter = (12 * l) * 0.0264583333;
      area = 12 * (Math.pow(l, 2)) * 0.0264583333;
      console.log("Volume: " + volume, "Perimeter: " + perimeter, "Area: " + area);
      text_to_send = `Volume: ${volume}cm²\n Perimeter: ${perimeter}cm²\n Area: ${area}cm²`;  
    }
  }

  document.getElementById('result').innerText = text_to_send;
}

function clearCanvas() {
  text_to_send = "";
  document.getElementById('result').innerText = text_to_send;
  document.getElementById('calculate').disabled = false;
  isFirst = true;
  arr = [];
  lines = [];
  window.location = __dirname + "\\index.html";
  return context.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
}

function predict(){
  calculate();
  text_to_send = "";
  document.getElementById('result').innerText = text_to_send;
  document.getElementById('calculate').disabled = false;
  let fHL = lines.find(x => x.position === "horizontal");
  let fVL = lines.find(x => x.position === "vertical");
  let horizontal_line = fHL;
  let vertical_line = fVL;
  if(horizontal_line.length - vertical_line.length > 60 || horizontal_line.length - vertical_line.length < -60 && lines.length >= 4){
    text_to_send = "This is not a cube!";
  } else {
    text_to_send = "This is a cube!";
  }
  document.getElementById('result').innerText = text_to_send;
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
    return (dx * dx + dy * dy) ** 0.5;
}

function addNewLine(element, index) {
  let len;
  if(!isFirst){
    len = element.length - lines[lines.length - 1].length;
  } else {
    len = element.length;
    //First time controll
    isFirst = false;
  }
  console.log(len)
  if(len > 20)
  lines.push({
    "position": element.position,
    "length": len
    });
}

function redrawLinesDB() {
  // for(let i=1; i < lines.length; i++){
  //     lines[i].length = lines[i].length - lines[i-1].length;
  //     console.log(i);
  // }
  console.log(lines)
}