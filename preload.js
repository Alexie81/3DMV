const path = require('path');
const url = require('url');
const customTitlebar = require('custom-electron-titlebar');

// const menu = Menu.getApplicationMenu()

window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  e.stopPropagation();
   new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#2f3241'),
    icon: url.format(path.join(__dirname, '/public/logo', '/app.png')),
    shortcuts: true,
    titleHorizontalAlignment: "left"
})

  setTimeout(function () {document.getElementsByClassName('menubar')[0].style.display = "none";
  // document.getElementsByClassName('window-controls-container')[0].style.display = "block";
  // document.getElementsByClassName('window-controls-container')[0].style.position = "absolute";
  // document.getElementsByClassName('window-controls-container')[0].style.right = "0";
}, 0)

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
});

// const exampleMenuTemplate = () => [
//   {
//     label: "Options",
//     submenu: [
//       {
//         label: "Quit",
//         click: () => app.quit()
//       },
//       {
//         label: "Radio1",
//         type: "radio",
//         checked: true
//       },
//       {
//         label: "Radio2",
//         type: "radio",
//       },
//       {
//         label: "Checkbox1",
//         type: "checkbox",
//         checked: true,
//         click: (item) => {
//           console.log("item is checked? " + item.checked);
//         }
//       },
//       {type: "separator"},
//       {
//         label: "Checkbox2",
//         type: "checkbox",
//         checked: false,
//         click: (item) => {
//           console.log("item is checked? " + item.checked);
//         }
//       },
//       {
//         label: "Radio Test",
//         submenu: [
//           {
//             label: "Sample Checkbox",
//             type: "checkbox",
//             checked: true
//           },
//           {
//             label: "Radio1",
//             checked: true,
//             type: "radio"
//           },
//           {
//             label: "Radio2",
//             type: "radio"
//           },
//           {
//             label: "Radio3",
//             type: "radio"
//           },
//           { type: "separator" },
//                       {
//             label: "Radio1",
//             checked: true,
//             type: "radio"
//           },
//           {
//             label: "Radio2",
//             type: "radio"
//           },
//           {
//             label: "Radio3",
//             type: "radio"
//           }
//         ]
//       },
//       {
//         label: "zoomIn",
//         role: "zoomIn"
//       },
//       {
//         label: "zoomOut",
//         role: "zoomOut"
//       },
//       {
//         label: "Radio1",
//         type: "radio"
//       },
//       {
//         label: "Radio2",
//         checked: true,
//         type: "radio"
//       },
//     ]
//   }
// ];
