class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = this.getRefsTimer(selector);
    this.targetDate = targetDate;
    this.intervalID = null;
    this.deltaTime = 0;
    this.start();
  }
  getRefsTimer(selector) {
    const refs = {};
    refs.container = document.querySelector(selector);
    refs.days = refs.container.querySelector('[data-value="days"]');
    refs.hours = refs.container.querySelector('[data-value="hours"]');
    refs.mins = refs.container.querySelector('[data-value="mins"]');
    refs.secs = refs.container.querySelector('[data-value="secs"]');

    return refs;
  }
  start() {
    this.intervalID = setInterval(() => {
      let currentTime = Date.now();
      this.deltaTime = this.targetDate - currentTime;
      if (this.deltaTime <= 0) {
        this.stop();
      }
      this.getTimeValues(this.deltaTime);
    }, 1000);
  }
  getTimeValues(deltaTime) {
    const daysValue = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
    const hoursValue = this.pad(
      Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const minsValue = this.pad(
      Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)),
    );
    const secsValue = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
    this.insertValues(daysValue, hoursValue, minsValue, secsValue);
  }
  stop() {
    clearInterval(this.intervalID);
  }

  pad(value) {
    return String(value).padStart(2, 0);
  }
  insertValues(d, h, m, s) {
    this.refs.days.textContent = d;
    this.refs.hours.textContent = h;
    this.refs.mins.textContent = m;
    this.refs.secs.textContent = s;
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 31, 2021'),
});
