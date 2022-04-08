import React, { ChangeEvent } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { IStoreRequest } from '../../pages/Request';
import { IRequest } from '../../types/requests';
import { methods } from '../../utils/requests';
import EnableDisableRequest from '../EnableDisableRequest';
import Input from '../Input';
import styles from './requests.module.scss';

interface IMethods {
  value: SingleValue<IRequest>;
  url: string;
  placeholder: string;
  handlePathChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (
    newValue: SingleValue<IRequest>,
    actionMeta: ActionMeta<IRequest>
  ) => void;
}

const Requests = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Methods = ({
  value,
  url,
  placeholder,
  handleChange,
  handlePathChange,
}: IMethods) => {
  return (
    <div className={styles.methods}>
      <Select
        className={styles.select}
        id='methods'
        options={methods}
        value={value}
        onChange={handleChange}
      />
      <Input
        placeholder={placeholder}
        value={url}
        name='url'
        autoComplete='off'
        onChange={handlePathChange}
      />
    </div>
  );
};

const View = ({
  request,
  handleRemove,
  handleToggle,
}: {
  request: IStoreRequest;
  handleRemove: () => void;
  handleToggle: () => void;
}) => (
  <div className={styles.view} title={JSON.stringify(request, null, 2)}>
    <div className='method'>
      <span data-method={request.method}>{request.method}</span>:
      <span className='path'>{request.path}</span>
    </div>
    <EnableDisableRequest
      isEnabled={request.isEnabled}
      handleToggle={handleToggle}
    />
    <button
      className='remove-button'
      onClick={handleRemove}
      title='Click to remove'
    >
      Remove
    </button>
  </div>
);

Requests.Methods = Methods;
Requests.View = View;

export default Requests;
