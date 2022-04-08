import React, { ChangeEvent, FormEvent } from 'react';
import { SingleValue } from 'react-select';
import Input from '../../components/Input';
import Requests from '../../components/Requests';
import axios from '../../lib/axios';
import { useDev } from '../../providers/DevToolProvider';
import { IFixtureData } from '../../types/dev-tools';
import { IRequest, Requests as R } from '../../types/requests';
import { findRequestValue, methods, removeBaseURL } from '../../utils/requests';
import style from './login.module.scss';

interface ITabsData {
  tabData: IFixtureData['login'];
}

const Login = ({ tabData }: ITabsData) => {
  const value = methods.find((x) => x.value === tabData.method) as IRequest;
  const { setDev } = useDev();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDev((dev) => ({
      ...dev,
      data: {
        ...dev.data,
        login: {
          ...dev.data.login,
          data: {
            ...dev.data.login.data,
            [name]: value,
          },
        },
      },
    }));
  };

  const onMethodChange = (method: SingleValue<IRequest>) => {
    setDev((dev) => ({
      ...dev,
      data: {
        ...dev.data,
        login: {
          ...dev.data.login,
          method: method?.value?.toUpperCase() || 'GET',
        },
      },
    }));
  };

  const handlePathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDev((dev) => ({
      ...dev,
      data: {
        ...dev.data,
        login: {
          ...dev.data.login,
          path: e.target.value,
        },
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: value.value,
      url: removeBaseURL(tabData.path),
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        console.log('Error');
      });
  };

  return (
    <div className={style.container}>
      <Requests>
        <Requests.Methods
          value={findRequestValue(tabData.method as R)}
          url={tabData.path}
          handleChange={onMethodChange}
          handlePathChange={handlePathChange}
          placeholder='/api/v1/login'
        />
      </Requests>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <Input
            type='text'
            placeholder='username'
            id='username'
            onChange={handleChange}
            name='username'
            value={tabData.data.username}
            autoComplete='off'
          />
          <Input
            type='text'
            placeholder='password'
            id='password'
            onChange={handleChange}
            name='password'
            value={tabData.data.password}
            autoComplete='off'
          />
          <button type='submit' className='p-5'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
