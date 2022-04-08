import React from 'react';
import styles from './styles.module.scss';

interface IProps {
  isEnabled: boolean;
  handleToggle: () => void;
}

const EnableDisableRequest = ({ isEnabled, handleToggle }: IProps) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${
          styles[isEnabled ? 'enabled' : 'disabled']
        }`}
        title={`Click to ${isEnabled ? 'disable' : 'enable'}`}
        onClick={handleToggle}
      />
    </div>
  );
};

export default EnableDisableRequest;
