import React from 'react';
import style from '../request.module.scss';

interface IImportExportRequestProps {
  handleImport: (e: any) => void;
  handleExport: () => void;
}

const ImportExportRequest = ({
  handleImport,
  handleExport,
}: IImportExportRequestProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={style['import-export-container']}>
      <div>
        <button onClick={() => inputRef.current?.click()}>upload</button>
        <input
          ref={inputRef}
          type='file'
          name='import'
          id='import'
          onChange={(e) => {
            handleImport(e);
            e.target.value = '';
          }}
        />
        <button onClick={handleExport}>export</button>
      </div>
    </div>
  );
};

export default ImportExportRequest;
