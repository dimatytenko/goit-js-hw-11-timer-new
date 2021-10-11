const refs = {
  daysC: document.querySelector('[data-value="days"]'),
  hoursC: document.querySelector('[data-value="hours"]'),
  minsC: document.querySelector('[data-value="mins"]'),
  secsC: document.querySelector('[data-value="secs"]'),
};
const { daysC, hoursC, minsC, secsC } = refs;

class CountdownTimer {
  constructor(finishDate, markup) {
    this.markup = markup;
    this.finishDate = finishDate;
    this.intervalID = null;
    this.deltaTime = 0;
    this.start();
  }

  start() {
    this.intervalID = setInterval(() => {
      let currentTime = Date.now();
      this.deltaTime = this.finishDate - currentTime;
      if (this.deltaTime <= 0) {
        this.stop();
      }
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

  // getTime(time) {
  //   const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  //   const hours = this.pad(
  //     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //   );
  //   const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  //   const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  //   return { days, hours, mins, secs };
  // }

  stop() {
    clearInterval(this.intervalID);
  }

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
}

const myTimer = new CountdownTimer(new Date('Oct 9, 2021'), {
  daysC,
  hoursC,
  minsC,
  secsC,
});
