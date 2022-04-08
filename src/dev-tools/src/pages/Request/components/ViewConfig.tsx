import React from 'react';
import hljs from 'highlight.js';
import style from '../request.module.scss';

type Props = {
  file: File;
  handleClearFile: () => void;
  handleSaveConfig: () => void;
};

type Ref = HTMLElement;

const ViewConfig = React.forwardRef<Ref, Props>((props, ref) => {
  const { file, handleClearFile, handleSaveConfig } = props;
  const [text, setText] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      const text = await file.text();

      if (text) {
        const configObject = JSON.parse(text);
        setText(JSON.stringify(configObject, null, 2));
        hljs.highlightAll();
      }
    })();
  }, [file]);

  return (
    <div className={style['view-configs']}>
      <div className={style.viewConfig}>
        <div>
          {file.name} <button onClick={handleClearFile}>clear</button>
          <button onClick={handleSaveConfig}>save config</button>
        </div>
      </div>
      <div contentEditable suppressContentEditableWarning>
        <pre>
          <code ref={ref} key={file.name} className='language-json'>
            {text}
          </code>
        </pre>
      </div>
    </div>
  );
});

ViewConfig.displayName = 'ViewConfig';

export default ViewConfig;
