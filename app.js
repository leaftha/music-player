let panelListElem;
let panelItemElem;

let dist;
let panelSize = 300;
let panelNum = 10;
let uniteRadian = (2 * Math.PI) / panelNum;
let uniteDegree = 360 / panelNum;

function setElem() {
  panelListElem = document.querySelector(".panel-list");
  panelItemElem = document.querySelectorAll(".panel-item");
}
function setPanel() {
  dist = panelSize / 2 / Math.tan(uniteRadian / 2) + panelSize * 0.65;
  for (let i = 0; i < panelItemElem.length; i++) {
    panelItemElem[i].style.transform = `rotateY(${
      uniteDegree * i
    }deg) translateZ(${-dist}px)`;
  }
}

function clickPanel(e) {}

window.addEventListener("load", () => {
  setElem();
  setPanel();

  panelItemElem.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(e.target.dataset.panelNum);
    });
  });
});
