let panelListElem;
let panelItemElem;
let panelsElem;

let dist;
let panelNum = 10;
let panelSize = 300;
let uniteRadian = (2 * Math.PI) / panelNum;
let uniteDegree = 360 / panelNum;

let clickedPanel;
let currentClickPanel;
let isClick = false;
let seePanel;

let startX;
let endX;
let isDown = false;
let walk = 0;

function setElem() {
  panelListElem = document.querySelector(".panel-list");
  panelItemElem = document.querySelectorAll(".panel-item");
  panelsElem = document.querySelector(".panels");
}
function setPanel() {
  dist = panelSize / 2 / Math.tan(uniteRadian / 2) + panelSize * 0.65;
  for (let i = 0; i < panelItemElem.length; i++) {
    panelItemElem[i].style.transform = `rotateY(${
      uniteDegree * i
    }deg) translateZ(${-dist}px)`;
  }
}

function clickPanel(clickedPanel) {
  if (-walk <= 0) {
    seePanel = Math.abs(walk);
  } else {
    seePanel = 360 - Math.abs(walk);
  }
  if (!isClick) {
    panelItemElem[clickedPanel].style.transform = `rotateY(${Math.round(
      seePanel
    )}deg)`;

    const timeId = setTimeout(() => {
      panelItemElem[clickedPanel].classList.add("active");
      clearTimeout(timeId);
    }, 500);
    isClick = true;
    currentClickPanel = clickedPanel;
  } else if (isClick === true && clickedPanel === currentClickPanel) {
    const timeId = setTimeout(() => {
      panelItemElem[clickedPanel].style.transform = `rotateY(${
        uniteDegree * currentClickPanel
      }deg) translateZ(${-dist}px)`;
      clearTimeout(timeId);
    }, 500);
    panelItemElem[clickedPanel].classList.remove("active");
    isClick = false;
  }
}

function DragPanel() {
  panelsElem.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - panelsElem.offsetLeft;
  });
  panelsElem.addEventListener("mouseleave", () => {
    isDown = false;
  });
  panelsElem.addEventListener("mouseup", () => {
    isDown = false;
  });
  panelsElem.addEventListener("mousemove", (e) => {
    if (isDown) {
      const x = e.pageX - panelsElem.offsetLeft;
      walk = (x - startX) / 5;
      panelListElem.style.transform = `rotateY(${-walk}deg)`;
    }
  });
}

window.addEventListener("load", () => {
  setElem();
  setPanel();

  panelItemElem.forEach((item) => {
    item.addEventListener("click", (e) => {
      clickedPanel = e.target.dataset.panelNum;
      clickPanel(clickedPanel);
    });
  });
  DragPanel();
});
