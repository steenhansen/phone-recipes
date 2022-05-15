import React from 'react';
import { StopWatch } from './StopWatch';

export default {
  title: 'View/StopWatch',
  component: StopWatch,
};

export const StopWatch_7min = (args) => {
  return (
    <StopWatch num_minutes={7} ></StopWatch>
  )
};
