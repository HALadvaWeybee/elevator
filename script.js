"use strict";
let floors = prompt("how many building floor you want in your building");
// let numElevators = prompt("Enter the number of Elevators your System has!");
let numElevators = Math.round(floors / 2);
let maxHeight = Number(floors) * 90;
let Elevators = [];
let flag;
document.querySelector(".container").innerHTML = "";

const showElevators = function () {
  for (let i = 1; i <= numElevators; i++) {
    let html = `<div class="elevator">
                  <div class="block--${i} blocks" style="height:${maxHeight}px">
                        <div class="elevator-${i} el" >
                              <span class="indicator-${i}">1</span>
                        </div>
                  </div>
                  <label class="switch">
                        <input type="checkbox" class=" switchs switch-${i}" onchange="check('${i}')">
                        <span class="slider round"></span>
                  </label>
            </div>`;
    Elevators.push({ id: i, checked: false, floor: 1, moving: false });
    document.querySelector(".container").insertAdjacentHTML("beforeend", html);
  }
  document
    .querySelector(".container")
    .insertAdjacentHTML("beforeend", `<div class="block-buttons"></div>`);
  document.querySelector(`.block-buttons`).style.height = `${maxHeight}px`;
  for (let i = floors; i >= 1; i--) {
    let html;
    if (i == 1) {
      html = `<div class="floor-${i} floor">
                  <div class="floorNo ${i}"><span>${i}</span></div>
                  <button class="btns btn-${i}-up" onclick="btnUp(${i})">
                        <div class="upBtn"></div>
                  </button>
            </div>`;
    } else if (i == floors) {
      html = `<div class="floor-${i} floor">
                  <div class="floorNo ${i}"><span>${i}</span></div>
               <button class="btns btn-${i}-dwn" onclick="btnDown(${i})">
                  <div class="downBtn"></div>
               </button>
            </div>`;
    } else {
      html = `<div class="floor-${i} floor">
                  <div class="floorNo ${i}"><span>${i}</span></div>
                  <button class="btns btn-${i}-Up" onclick="btnUp(${i})">
                        <div class="upBtn"></div>
                  </button>
               <button class="btns btn-${i}-dwn" onclick="btnDown(${i})">
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

const check = function (i) {
  const index = Elevators.findIndex((x) => x.id == i);
  Elevators[index].checked = !Elevators[index].checked;

  for (let el of Elevators) {
    if (el.checked == true) {
      document.querySelector(`.elevator-${el.id}`).style.bottom = "0px";
      document.querySelector(`.elevator-${el.id}`).style.border =
        "1px solid red";
      document.querySelector(`.indicator-${el.id}`).innerHTML = `1`;
      el.floor = 1000000000000;
    } else {
      document.querySelector(`.elevator-${el.id}`).style.border = "none";
      if (el.floor > Elevators.length) {
        el.floor = 1;
      } else {
        el.floor = el.floor;
      }
    }
  }
};

const close = function (i) {
  let closeEL = Elevators.map((el) => el.floor).reduce((prev, curr) => {
    return Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev;
  });
  let el = Elevators.findIndex((el) => el.floor === closeEL);
  return el;
};

const ElevatorMovments = function (close, i) {
  let lift = Elevators[close];

  if (!lift.moving) {
    if (!lift.checked) {
      let animate = null;
      // let animateDoors = null;
      let positionBtn = (lift.floor - 1) * 90;
      let distBtn = 90 * (i - 1);
      let tempFloorBtn = positionBtn;
      let tempFloor = lift.floor;
      lift.floor = i;
      // console.log(lift.floor);
      clearInterval(animate);
      animate = setInterval(function () {
        if (positionBtn == distBtn) {
          if (positionBtn === tempFloorBtn) {
            tempFloorBtn += 90;
            document.querySelector(`.indicator-${lift.id}`).textContent =
              tempFloor;
            tempFloor++;
          }

          lift.moving = false;
          clearInterval(animate);
        } else {
          lift.moving = true;
          if (positionBtn < distBtn) {
            if (tempFloorBtn === positionBtn) {
              tempFloorBtn += 90;
              document.querySelector(`.indicator-${lift.id}`).textContent =
                tempFloor;
              tempFloor++;
            }
            positionBtn++;
            document.querySelector(
              `.elevator-${lift.id}`
            ).style.bottom = `${positionBtn}px`;
          } else {
            if (tempFloorBtn === positionBtn) {
              tempFloorBtn -= 90;
              document.querySelector(`.indicator-${lift.id}`).textContent =
                tempFloor;
              tempFloor--;
            }
            positionBtn--;
            document.querySelector(
              `.elevator-${lift.id}`
            ).style.bottom = `${positionBtn}px`;
          }
        }
      }, 5);
    }
  } else {
    if (flag === true) {
      if (close === Elevators.length - close) {
        flag = false;
      }
      close = close - 1;
      ElevatorMovments(close, i);
    } else {
      if (close === Elevators.length - 1) {
        flag = true;
      }
      close = close + 1;
      ElevatorMovments(close, i);
    }
  }
};

const btnUp = function (i) {
  ElevatorMovments(close(i), i);
};

const btnDown = function (i) {
  ElevatorMovments(close(i), i);
};
