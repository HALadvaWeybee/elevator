"use strict";
// let answer = prompt("how many building floor you want in your building");
let answer = 7;
// let elev = prompt("Enter the number of Elevators your System has!");
let elev = 3;
// let elev = Math.round(answer / 2);
let maxHeight = Number(answer) * 90;
let allLeeps = [];
let flag;
document.querySelector(".container").innerHTML = "";

const showElevators = function () {
  for (let i = 1; i <= elev; i++) {
    let html = `<div class="elevator">
                  <div class="block--${i} blocks" style="height:${maxHeight}px">
                        <div class="elevator-${i} el" >
                              <span class="indicator-${i}">1</span>
                        </div>
                  </div>
                  <label class="switch">
                        <input type="checkbox" class=" switchs switch-${i}" onchange="checkOnOff('${i}')">
                        <span class="slider round"></span>
                  </label>
            </div>`;
            allLeeps.push({ id: i, checked: false, floor: 1, moving: false });
    document.querySelector(".container").insertAdjacentHTML("beforeend", html);
  }
  document
    .querySelector(".container")
    .insertAdjacentHTML("beforeend", `<div class="block-buttons"></div>`);
  document.querySelector(`.block-buttons`).style.height = `${maxHeight}px`;
  for (let i = answer; i >= 1; i--) {
    let html;
    if (i == 1) {
      html = `<div class="floor-${i} floor">
                  <div class="floorNo ${i}"><span>${i}</span></div>
                  <button class="btns btn-${i}-up" onclick="btnUp(${i})">
                        <div class="upBtn"></div>
                  </button>
            </div>`;
    } else if (i == answer) {
      html = `<div class="floor-${i} floor">
                  <div class="floorNo ${i}"><span>${i}</span></div>
               <button class="btns btn-${i}-dwn" onclick="btnUp(${i})">
                  <div class="downBtn"></div>
               </button>
            </div>`;
    } else {
      html = `<div class="floor-${i} floor">
                  <div class="floorNo ${i}"><span>${i}</span></div>
                  <button class="btns btn-${i}-Up" onclick="btnUp(${i})">
                        <div class="upBtn"></div>
                  </button>
               <button class="btns btn-${i}-dwn" onclick="btnUp(${i})">
                  <div class="downBtn"></div>
               </button>
            </div>`;
    }
    document
      .querySelector(".block-buttons")
      .insertAdjacentHTML("afterbegin", html);
  }
  document
    .querySelector(`.block-buttons`)
    .insertAdjacentHTML(
      "afterbegin",
      `<div class="maintenance"><span >MAINTENANCE</span></div>`
    );
};
showElevators();

const myClose = function (i) {
  // console.log("i",i);
  
  let closeElevator = allLeeps.filter(ele => ele.checked == false).map((el) => el.floor).reduce((prev, curr) => {
    return Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev;
  });
  let elevator = allLeeps.findIndex((el) => el.floor === closeElevator);
  return elevator;
 
};

const checkOnOff = function (i) {
  const index = allLeeps.findIndex((x) => x.id == i);
  // console.log("index", index, i);
  // console.log("CheckedLeeps",allLeeps);
  allLeeps[index].checked = !allLeeps[index].checked;
  

  for (let el of allLeeps) {
    if (el.checked == true) {
      document.querySelector(`.elevator-${el.id}`).style.bottom = "0px";
      document.querySelector(`.elevator-${el.id}`).style.border =
        "1px solid red";
      document.querySelector(`.indicator-${el.id}`).innerHTML = `1`;
      el.floor = 10000;
    } else if(el.checked == false) {
      document.querySelector(`.elevator-${el.id}`).style.border = "none";
        if (el.floor == 10000) {
          el.floor = 1;
        }
        else {  
          el.floor = el.floor;
        }
    }
  }
};


const movingLeep = function (data, i) {
  let leep = allLeeps[data];
  
  if (!leep.moving) {
    // console.log("leep", leep);
    // console.log("allLeeps123",allLeeps);
    if (!leep.checked) {
      let animate = null;
      let positionBtn = (leep.floor - 1) * 90;
      let distBtn = 90 * (i - 1);
      let tempFloorBtn = positionBtn;
      let tempFloor = leep.floor;
      
      leep.floor = i;
      clearInterval(animate);
      animate = setInterval(function () {
        if (positionBtn == distBtn) {
          if (positionBtn === tempFloorBtn) {
            tempFloorBtn += 90;
            document.querySelector(`.indicator-${leep.id}`).textContent = tempFloor;
            tempFloor++;
          }
          leep.moving = false;
          clearInterval(animate);
        } else {
          leep.moving = true;
          if (positionBtn < distBtn) {
            if (tempFloorBtn === positionBtn) {
              tempFloorBtn += 90;
              document.querySelector(`.indicator-${leep.id}`).textContent =tempFloor;
              tempFloor++;
            }
            positionBtn++;
            document.querySelector(`.elevator-${leep.id}`).style.bottom = `${positionBtn}px`;
          } else {
            if (tempFloorBtn === positionBtn) {
              tempFloorBtn -= 90;
              document.querySelector(`.indicator-${leep.id}`).textContent =tempFloor;
              tempFloor--;
            }
            positionBtn--;
            document.querySelector(`.elevator-${leep.id}`).style.bottom = `${positionBtn}px`;
          }
        }
      }, 5);
    }
  } else {
    if (flag == true) {
      if (data = allLeeps.length - data) {
        flag = false;
      }
      data = data - 1;
      movingLeep(data, i);
    } else {
      data = data + 1;
      if (data == allLeeps.length - 1) {
        flag = true;
      }
      movingLeep(data, i);
    }
  }
};

const btnUp = function (i) {
  movingLeep(myClose(i), i);
};

// const btnDown = function (i) {
//   movingLeep(myClose(i), i);
// };
