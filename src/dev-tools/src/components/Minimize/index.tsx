import React from 'react';
import { useDev } from '../../providers/DevToolProvider';
import ArrowUp from './arrow-up.svg';
import ArrowDown from './arrow-down.svg';
import style from './minimize.module.scss';

const Minimize = () => {
  const { minimize, setDev } = useDev();

  const toggleMinimize = () => {
    const newMinimizeValue = !minimize;
    setDev((dev) => ({ ...dev, minimize: newMinimizeValue }));
    localStorage.setItem('minimize', newMinimizeValue.toString());
  };
  return (
    <div className={style.icons} role='button' onClick={toggleMinimize}>
      <img
        src={minimize ? ArrowUp : ArrowDown}
        data-icon={minimize ? 'arrow-up' : 'arrow-down'}
      />
    </div>
  );
};

export default Minimize;
