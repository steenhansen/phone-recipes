import React from 'react';

export const ButtonBase = ({ className, is_disabled, ...props }) => {
  if (props.children.type !== 'a') {
    throw "ButtonBase expects to contain an href ";
  }

  if (is_disabled) {
    const href_text = props.children.props.children;
    return (
      <button className={['base-button', className, 'cursor-not-allowed', 'opacity-50'].join(' ')}  >
        {href_text}
      </button>
    );
  }
  return (
    <button className={['base-button', className].join(' ')} >
      {props.children}
    </button>
  );
};

