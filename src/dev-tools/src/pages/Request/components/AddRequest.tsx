import React, { ChangeEvent } from 'react';
import { SingleValue } from 'react-select';
import { IData } from '..';
import Input from '../../../components/Input';
import Requests from '../../../components/Requests';
import { IRequest } from '../../../types/requests';

interface IAddRequest {
  data: IData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMethodChange: (method: SingleValue<IRequest>) => void;
  handleAdd: () => void;
}

const AddRequest = ({
  data,
  handleChange,
  onMethodChange,
  handleAdd,
}: IAddRequest) => {
  return (
    <Requests>
      <div className='request-form'>
        <Requests.Methods
          value={data.current.value}
          url={data.current.url}
          placeholder='/api/v1/login'
          handlePathChange={handleChange}
          handleChange={onMethodChange}
        />
        <Input
          type='text'
          name='responseKey'
          id='responseKey'
          placeholder='response key;eg:login.error'
          value={data.current.responseKey}
          onChange={handleChange}
        />
        <button className='py-5 px-8' onClick={handleAdd}>
          Add
        </button>
      </div>
    </Requests>
  );
};

export default AddRequest;
