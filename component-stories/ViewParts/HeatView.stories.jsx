import React from 'react';
import { HeatView } from './HeatView';

export default {
  title: 'View/HeatView',
  component: HeatView
};

export const Heat_View = (args) => {
  return (
    <HeatView time={12} ></HeatView>
  )
};