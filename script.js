window.addEventListener('DOMContentLoaded', () => {
  const choiceBtn = document.getElementById('choiceBtn');
  const drawBtn = document.getElementById('drawBtn');
  const resetBtn = document.getElementById('resetBtn');
  let pbNum;
  let hitNum;
  let judge;
  let hitCount = 0;
  const choiceOut = document.getElementById('choiceOut');
  const judgeTxt = document.getElementById('judgeTxt');
  const hitCountOut = document.getElementById('hitCountOut');
  const hitOut = document.getElementById('hitOut');
  const drawOut = document.getElementById('drawOut');
  const drawNumOut = document.getElementById('drawNumOut');
  const realOut = document.getElementById('realOut');
  drawBtn.disabled = true;
  drawBtn.classList.add('disabled');

  drawBtn.addEventListener('click', draw);
  choiceBtn.addEventListener('click', choice);
  resetBtn.addEventListener('click', reset);

  function reset() {
    location.reload();
  }
  function choice() {
    const choiceNum = parseInt(document.getElementById('choiceNum').value);
    if (typeof choiceNum === 'number' && isNaN(choiceNum) === false) {
      pbNum = choiceNum;
      choiceOut.textContent = `選んだ当選確率は1/${pbNum}=${(1 / pbNum).toFixed(
        5
      )}%です。`;
      hitNum = Math.floor(Math.random() * pbNum);
      invalidate();
      activation();
    }
  }
  function draw() {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    const drawNum = Math.floor(Math.random() * pbNum);
    hitOut.innerHTML = `当たりの番号は<span class="hitNum">${hitNum}</span>`;
    let li = document.createElement('li');
    if (drawNum === hitNum) {
      hitCountOut.innerHTML = `当選回数：${++hitCount}`;
      judge = 'あたり';
      judgeTxt.innerHTML = '<span class="hit">!!!あたり!!!</span>';
      li.innerHTML = `${
        drawOut.childElementCount + 1
      }回目：<span class="hit">【${judge}】</span>引いた番号は<span class="hitNum">${drawNum}</span>`;
    } else {
      judge = 'はずれ';
      judgeTxt.innerHTML = '<span class="drop">はずれ</span>';
      li.innerHTML = `${
        drawOut.childElementCount + 1
      }回目：<span class="drop">【${judge}】</span>引いた番号は<span class="dropNum">${drawNum}</span>`;
    }
    drawOut.insertBefore(li, drawOut.firstChild);
    drawNumOut.innerHTML = `
    <span class="drawTxt">最新の引いた番号</span>
    <span class="drawNum">${drawNum}</span>`;
    real();
  }
  function invalidate() {
    choiceBtn.disabled = true;
    choiceBtn.classList.add('disabled');
  }
  function activation() {
    drawBtn.disabled = false;
    drawBtn.classList.remove('disabled');
  }
  function real() {
    let realNum = hitCount / (drawOut.childElementCount + 1);
    realOut.innerHTML = `現在の当選確率：${hitCount}/${
      drawOut.childElementCount + 1
    }=${realNum}%です`;
  }
});
