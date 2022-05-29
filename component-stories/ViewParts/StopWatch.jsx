import React, { useState, useEffect, useRef } from "react";
import { ButtonBase } from "../ButtonBase";

export { StopWatch };

const EXTRA_TIMER_START = -0.0001;

const TIMER_FINE_COLOR = "text-[#009e73]"; // bluish-green_164  0,158,115    #009e73
const TIMER_OVER_COLOR = "text-[#cc79a7]"; // red_purple_326    204,121,167  #cc79a7
const TIMER_EXTRA_COLOR = "text-[#e69f00]"; // orange_41         230,159,0    #e69f00

const toHHMMSS = function (sec_num, num_minutes) {
  const pos_num = Math.abs(sec_num);
  const to_hours = Math.floor(pos_num / 3600);
  let to_minutes = Math.floor((pos_num - to_hours * 3600) / 60);
  let to_seconds = pos_num - to_hours * 3600 - to_minutes * 60;
  if (to_minutes < 10) {
    to_minutes = "0" + to_minutes;
  }
  if (to_seconds < 10) {
    to_seconds = "0" + to_seconds;
  }
  let hh_mm_ss = to_minutes + ":" + to_seconds;
  if (to_hours > 0) {
    hh_mm_ss = to_hours + ":" + to_minutes + ":" + to_seconds;
  }
  if (num_minutes > 0 && sec_num < 0) {
    hh_mm_ss = "- " + hh_mm_ss; // show negative time when counting down, extra timer is only positive
  }
  return hh_mm_ss;
};

function startTimer(num_minutes, stopWatchClick) {
  if (num_minutes < 0) {
    const extra_button = (
      <>
        <span>&nbsp;</span>
        <ButtonBase className="block mb-3">
          <a onClick={stopWatchClick}>
            Start
            <br />
            Extra Timer
          </a>
        </ButtonBase>
        <span>&nbsp;</span>
      </>
    );
    return extra_button;
  }
  const recipe_button = (
    <>
      <span>&nbsp;</span>
      <ButtonBase className="block mb-3" title="check_StopWatch">
        <a onClick={stopWatchClick}>Start {num_minutes} Minute Timer</a>
      </ButtonBase>
      <span>&nbsp;</span>
    </>
  );
  return recipe_button;
}

function resumeReset(num_minutes, hh_mm_ss, stopWatchClick, resetClick) {
  if (num_minutes < 0) {
    const extra_button = (
      <>
        <ButtonBase className="block mb-3">
          <a onClick={stopWatchClick}>
            Resume
            <br />
            Extra Timer
          </a>
        </ButtonBase>
        <ButtonBase className="block mb-3">
          <a onClick={resetClick}>
            Reset
            <br />
            Extra Timer
          </a>
        </ButtonBase>
        <div className="text-2xl">{hh_mm_ss} </div>
      </>
    );
    return extra_button;
  }
  const recipe_button = (
    <>
      <ButtonBase className="block mb-3">
        <a onClick={stopWatchClick}>Resume Timer</a>
      </ButtonBase>
      <ButtonBase className="block mb-3">
        <a onClick={resetClick}>Reset Timer</a>
      </ButtonBase>
      <div className="text-2xl">{hh_mm_ss} </div>
    </>
  );
  return recipe_button;
}

function pauseTimer(num_minutes, hh_mm_ss, stopWatchClick) {
  if (num_minutes < 0) {
    const extra_button = (
      <>
        <ButtonBase className="block mb-3">
          <a onClick={stopWatchClick}>
            Pause
            <br />
            Extra Timer
          </a>
        </ButtonBase>
        <div className="text-2xl font-semibold">{hh_mm_ss} </div>
      </>
    );
    return extra_button;
  }
  const recipe_button = (
    <>
      <ButtonBase className="block mb-3">
        <a onClick={stopWatchClick}>Pause Timer</a>
      </ButtonBase>
      <div className="text-2xl font-semibold">{hh_mm_ss} </div>
    </>
  );
  return recipe_button;
}

function drawTimer({ countdown_seconds, is_paused, seconds_total, num_minutes, stopWatchClick, resetClick }) {
  let stop_watch;
  const hh_mm_ss = toHHMMSS(countdown_seconds, num_minutes);

  let timer_color = TIMER_FINE_COLOR;
  if (num_minutes < 0) {
    timer_color = TIMER_EXTRA_COLOR;
  } else if (countdown_seconds < 0) {
    timer_color = TIMER_OVER_COLOR; // only counting down timers get to be red, extra is always green
  }

  if (countdown_seconds === seconds_total) {
    stop_watch = startTimer(num_minutes, stopWatchClick);
  } else if (is_paused) {
    stop_watch = resumeReset(num_minutes, hh_mm_ss, stopWatchClick, resetClick);
  } else {
    stop_watch = pauseTimer(num_minutes, hh_mm_ss, stopWatchClick);
  }
  return (
    <div id="-filter-top-" className={` flex justify-between  ${timer_color} `}>
      {stop_watch}
    </div>
  );
}

function StopWatch({ num_minutes }) {
  if (num_minutes === 0) {
    return "";
  }

  let seconds_total = num_minutes * 60;
  if (num_minutes < 0) {
    seconds_total = EXTRA_TIMER_START;
  }

  const [is_paused, setIsPaused] = useState(true);
  const [countdown_seconds, setCountdown] = useState(seconds_total);
  let interval_ref = useRef();

  const doCountDown = () => {
    let int_seconds = countdown_seconds;
    if (countdown_seconds === EXTRA_TIMER_START) {
      int_seconds = 0;
    }
    const new_seconds = int_seconds - 1;
    setCountdown(new_seconds);
  };

  useEffect(() => {
    if (!is_paused) {
      interval_ref.current = setTimeout(doCountDown, 1000);
    }
  }, [countdown_seconds]);

  const stopWatchClick = () => {
    if (is_paused) {
      interval_ref.current = setTimeout(doCountDown); // start immediately
    } else {
      clearTimeout(interval_ref.current);
    }
    setIsPaused(!is_paused);
  };

  const resetClick = () => {
    setIsPaused(true);
    setCountdown(seconds_total);
  };

  let stop_watch = drawTimer({ countdown_seconds, is_paused, seconds_total, num_minutes, stopWatchClick, resetClick });
  return stop_watch;
}
