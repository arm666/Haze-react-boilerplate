import React from 'react';
import { Resizable } from 're-resizable';
import { useDev } from '../../providers/DevToolProvider';
import Tabs from '../../components/Tabs';
import useLocalStorage from '../../hooks/useLocalstorage';
import Minimize from '../../components/Minimize';
import styles from './dev-tool.module.scss';

const DEFAULT_HEIGHT = 400;
const MIN_HEIGHT = 10;

interface ISize {
  height: number;
  width: number;
}

const DevToolUI = () => {
  const { tabs, onTabClick, minimize, setDev } = useDev();
  const [height, setSize] = useLocalStorage('dev-tool-size', {
    current: DEFAULT_HEIGHT,
    saved: DEFAULT_HEIGHT,
  });

  React.useEffect(() => {
    if (minimize) {
      setSize((size) => ({ ...size, current: MIN_HEIGHT }));
    } else {
      setSize((size) => ({ ...size, current: size.saved }));
    }
  }, [minimize, setSize]);

  const handleResize = (e: any, direction: any, ref: any, d: ISize) => {
    const newHeight = height.current + d.height;
    if (minimize) {
      setDev((dev) => ({ ...dev, minimize: false }));
    }
    setSize((prev) => ({
      ...prev,
      current: newHeight,
      saved: prev.current + d.height,
    }));
  };

  return (
    <div className={styles.resizableContainer}>
      <Resizable
        size={{
          height: height.current || DEFAULT_HEIGHT,
          width: 'auto',
        }}
        className={styles.resizable}
        onResizeStop={handleResize}
      >
        <div className={styles.container}>
          <div>
            <Minimize />
          </div>
          <div className={styles.innerContainer}>
            <Tabs>
              <Tabs.Header
                active={tabs.active}
                tabs={tabs.data}
                onTabClick={onTabClick}
              />
              <Tabs.Body activeTab={tabs.active} components={tabs.data} />
            </Tabs>
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default DevToolUI;
