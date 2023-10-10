function taskTimeControl(
  taskEndTime,
  setTimeState,
  setTaskFinished,
  setTimeNotice
) {
  let time = taskEndTime;

  return setInterval(() => {
    console.log(time.seconds);
    if (
      time.seconds === 0 &&
      time.minutesLimit === 0 &&
      time.hoursLimit === 0
    ) {
      setTaskFinished(true);
      return;
    }

    if (
      time.seconds === 30 &&
      time.minutesLimit === 0 &&
      time.hoursLimit === 0
    ) {
      setTimeNotice(true);
    }

    if (time.seconds === 0) {
      time.seconds = 59;
      if (time.minutesLimit === 0) {
        time.minutesLimit = 59;
        time.hoursLimit -= 1;
      } else time.minutesLimit -= 1;
      setTimeState({
        ...time,
        minutesLimit: time.minutesLimit,
      });
    } else if (time.seconds > 0) {
      time.seconds = time.seconds - 1;
      setTimeState({
        ...time,
        seconds: time.seconds,
      });
    }
    if (time.minutesLimit === 0 && time.hoursLimit > 0) {
      time.minutesLimit = 59;
      time.hoursLimit = time.hoursLimit - 1;
      setTimeState({
        ...time,
        hoursLimit: time.hoursLimit,
      });
    }
  }, 999);
}

export { taskTimeControl };
