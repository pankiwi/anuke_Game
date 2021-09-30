
/** by Alain Galvan **/

class Timer {
  // Adds a timer with a given start time.
  addTimer(key, time = 1) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      writable: true,
      value: { cur: time, start: time }
    });
  }

  // Updates all the timers in this instance.
  update(time) {
    for (var key in this) {
      if (!isNaN(parseFloat(this[key].cur)) && isFinite(this[key].cur))
        this[key].cur -= time;
    }
  }

  // Checks if a given timer is done.
  done(key) {
    if (this[key])
      return this[key].cur <= 0;
    return false;
  }

  // Resets a timer to it's last set value.
  reset(key) {
    this[key].cur = this[key].start;
  }

  // Sets a timer to a given value.
  set(key, value) {
    this[key] = { cur: value, start: value };
  }

  // Gets the current value of a timer.
  get(key) {
    return this[key].cur;
  }

  remove(key) {
    delete this[key];
  }

}
