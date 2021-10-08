const refs = {
  daysC: document.querySelector('[data-value="days"]'),
  hoursC: document.querySelector('[data-value="hours"]'),
  minsC: document.querySelector('[data-value="mins"]'),
  secsC: document.querySelector('[data-value="secs"]'),
};
const { daysC, hoursC, minsC, secsC } = refs;

class Timer {
  constructor(finishDate, markup) {
    this.markup = markup;
    this.finishDate = finishDate;
    this.intervalID = null;
    this.deltaTime = 0;
  }
  start() {
    console.log('timer started');
    this.intervalID = setInterval(() => {
      let currentTime = Date.now();
      this.deltaTime = this.finishDate - currentTime;
      const days = this.pad(Math.floor(this.deltaTime / (1000 * 60 * 60 * 24)));
      const hours = this.pad(
        Math.floor((this.deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      const mins = this.pad(
        Math.floor((this.deltaTime % (1000 * 60 * 60)) / (1000 * 60)),
      );
      const secs = this.pad(Math.floor((this.deltaTime % (1000 * 60)) / 1000));
      this.insertValues(days, hours, mins, secs);
    }, 1000);
  }
  stop() {
    console.log(this.intervalID);
    clearInterval(this.intervalID);
  }
  // =============
  pad(value) {
    return String(value).padStart(2, 0);
  }
  insertValues(d, h, m, s) {
    const { daysC, hoursC, minsC, secsC } = this.markup;
    daysC.textContent = d;
    hoursC.textContent = h;
    minsC.textContent = m;
    secsC.textContent = s;
  }
  // =============
}

const myTimer = new Timer(new Date('Oct 11, 2021'), {
  daysC,
  hoursC,
  minsC,
  secsC,
});
myTimer.start();
