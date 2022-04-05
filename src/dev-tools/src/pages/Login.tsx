import React, { ChangeEvent, FormEvent } from 'react';
import { SingleValue } from 'react-select';
import Input from '../components/Input';
import Requests from '../components/Requests';
import axios from '../lib/axios';
import { IFixtureTabData } from '../types/dev-tools';
import { IRequest } from '../types/requests';
import { methods } from '../utils/requests';

interface IForm {
  data: {
    username: string;
    password: string;
  };
  requests: {
    url: string;
    value: SingleValue<IRequest>;
  };
}

interface ITabsData {
  tabData: IFixtureTabData;
}

const Login = ({ tabData }: ITabsData) => {
  const value = methods.find(
    (x) => x.value === tabData.api[0].method
  ) as IRequest;

  const [form, setForm] = React.useState<IForm>({
    data: {
      username: tabData.data.username,
      password: tabData.data.password,
    },
    requests: {
      value,
      url: tabData.api[0].path,
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      data: {
        ...form.data,
        [name]: value,
      },
    }));
  };

  const onMethodChange = (method: SingleValue<IRequest>) => {
    setForm((form) => ({
      ...form,
      requests: {
        ...form.requests,
        value: method,
      },
    }));
  };

  const handlePathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      requests: {
        ...form.requests,
        url: e.target.value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get('/login')
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        console.log('Error');
      });
  };

  return (
    <div className='w-2 grid gap-5'>
      <Requests>
        <Requests.Methods
          value={form.requests.value}
          url={tabData.api[0].path}
          handleChange={onMethodChange}
          handlePathChange={handlePathChange}
          placeholder='/api/v1/login'
        />
      </Requests>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-5'>
          <Input
            type='text'
            placeholder='username'
            id='username'
            onChange={handleChange}
            name='username'
            value={form.data.username}
            autoComplete='off'
          />
          <Input
            type='text'
            placeholder='password'
            id='password'
            onChange={handleChange}
            name='password'
            value={form.data.password}
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
