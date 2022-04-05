import React, { ChangeEvent } from 'react';
import { SingleValue } from 'react-select';
import { nanoid } from 'nanoid';
import { useCookies } from 'react-cookie';
import Requests from '../components/Requests';
import { defaultRequestValue } from '../utils/requests';
import { IRequest, Requests as ApiRequest } from '../types/requests';
import Input from '../components/Input';

export interface IStoreRequest {
  path: string;
  method: ApiRequest;
  id: string;
  responseKey: string;
}

interface IData {
  current: { value: SingleValue<IRequest>; url: string; responseKey: string };
}

const Request = () => {
  const [data, setData] = React.useState<IData>({
    current: {
      value: defaultRequestValue,
      url: '',
      responseKey: '',
    },
  });

  const [cookies, setCookies] = useCookies(['request']);

  const onMethodChange = (method: SingleValue<IRequest>) => {
    setData((data) => ({
      ...data,
      current: {
        ...data.current,
        value: method,
      },
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      current: {
        ...data.current,
        [name]: value,
      },
    }));
  };

  const handleAdd = () => {
    if (data.current.url.trim().length) {
      const newRequest: IStoreRequest = {
        path: data.current.url.trim(),
        method: data.current.value?.value as ApiRequest,
        id: nanoid(),
        responseKey: data.current.responseKey,
      };

      const previousURL = Object.getOwnPropertyDescriptor(
        cookies.request || {},
        data.current.url
      );

      const isKeyPresent = Boolean(previousURL?.value);
      const previousList = isKeyPresent ? previousURL?.value : [];

      const newCookies = Object.assign(cookies.request || {}, {
        [data.current.url]: [...previousList, newRequest],
      });

      setCookies('request', JSON.stringify(newCookies));
      handleResetForm();
    }
  };

  const handleRemove = (key: string, request: IStoreRequest) => {
    const newCookies = Object.assign(cookies.request);
    newCookies[key] = newCookies[key].filter(
      (x: IStoreRequest) => x.id !== request.id
    );

    setCookies('request', JSON.stringify(newCookies));
  };

  const handleResetForm = () => {
    setData((data) => ({
      ...data,
      current: {
        ...data.current,
        url: '',
        value: defaultRequestValue,
      },
    }));
  };

  console.log(cookies.request);

  return (
    <div className='grid grid-3 gap-10 align-items-start'>
      <Requests>
        <div className='grid gap-5 '>
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
      <div className='grid gap-5'>
        {Object.entries<IStoreRequest[]>(cookies.request || {}).map(
          ([url, requests]) =>
            requests.map((request) => (
              <Requests.View
                key={request.id}
                request={request}
                handleRemove={() => handleRemove(url, request)}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Request;
