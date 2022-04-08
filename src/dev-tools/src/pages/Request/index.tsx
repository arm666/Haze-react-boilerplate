import React, { ChangeEvent } from 'react';
import { SingleValue } from 'react-select';
import { nanoid } from 'nanoid';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { defaultRequestValue } from '../../utils/requests';
import { IRequest, Requests as ApiRequest } from '../../types/requests';
import { bolbBuilder, getDownloadableTag } from '../../utils/helpers';
import style from './request.module.scss';
import AddRequest from './components/AddRequest';
import ViewRequest from './components/ViewRequest';
import ImportExportRequest from './components/ImportExportRequest';
import ViewConfig from './components/ViewConfig';

export interface IStoreRequest {
  path: string;
  method: ApiRequest;
  id: string;
  responseKey: string;
  isEnabled: boolean;
}

export interface ICookie {
  request: { [keys: string]: IStoreRequest[] };
}

export interface IData {
  current: { value: SingleValue<IRequest>; url: string; responseKey: string };
}

const RESPONSE_CONFIG = 'responseConfig';

const Request = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [data, setData] = React.useState<IData>({
    current: {
      value: defaultRequestValue,
      url: '',
      responseKey: '',
    },
  });

  const [cookies, setCookies] = useCookies(['request']);
  const codeRef = React.useRef<HTMLElement>(null);

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
    handleDataChange(name, value as Partial<IData['current']>);
  };

  const handleDataChange = (name: string, value: Partial<IStoreRequest>) => {
    setData((data) => ({
      ...data,
      current: {
        ...data.current,
        [name]: value,
      },
    }));
  };

  const handleToggle = (key: string, request: IStoreRequest) => {
    const currentRequests = Object.getOwnPropertyDescriptor(
      cookies.request,
      key
    );

    if (currentRequests?.value) {
      const updateData = currentRequests.value.map((x: IStoreRequest) =>
        x.id === request.id ? { ...x, isEnabled: !x.isEnabled } : x
      );
      const newCookie = Object.assign(cookies.request, {
        [key]: updateData,
      });

      handleSetCookie(newCookie);
    }
  };

  const handleAdd = () => {
    if (data.current.url.trim().length) {
      const newRequest: IStoreRequest = {
        path: data.current.url.trim(),
        method: data.current.value?.value as ApiRequest,
        id: nanoid(10),
        responseKey: data.current.responseKey,
        isEnabled: true,
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
      handleSetCookie(newCookies);
      handleResetForm();
    }
  };

  const handleSetCookie = (cookie: Object) => {
    setCookies('request', JSON.stringify(cookie), {
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
    });
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
        responseKey: '',
      },
    }));
  };

  const handleImport = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleExport = async () => {
    let configs = {};
    try {
      const response = await axios.get('/dev-tools/config');
      configs = JSON.parse(response.data);
    } catch (error) {
      //
    }

    const data = {
      ...cookies,
      [RESPONSE_CONFIG]: configs,
    };
    const type = 'application/json';
    const blob: Blob = bolbBuilder(data, type);
    const link = getDownloadableTag('devtools-config.json', blob);
    link.click();
  };

  const handleClearFile = () => {
    setFile(null);
  };

  const handleSaveConfig = () => {
    try {
      const textContent = codeRef.current?.textContent || '';
      const configs = JSON.parse(textContent);
      const cookieConfig = Object.getOwnPropertyDescriptor(configs, 'request');
      const responseConfig = Object.getOwnPropertyDescriptor(
        configs,
        RESPONSE_CONFIG
      );
      if (cookieConfig?.value) saveCookieConfig(cookieConfig.value);
      if (responseConfig?.value) saveResponseConfig(responseConfig.value);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const saveCookieConfig = (cookieConfig: Object) => {
    handleSetCookie(cookieConfig);
  };

  const saveResponseConfig = (responseConfig: any) => {
    console.log(responseConfig);

    axios
      .post('/dev-toos/config', {
        ...responseConfig,
      })
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(cookies);

  return (
    <div className={style.container}>
      <AddRequest
        data={data}
        handleAdd={handleAdd}
        onMethodChange={onMethodChange}
        handleChange={handleChange}
      />
      <div className={style.requests}>
        <ViewRequest
          cookies={cookies as ICookie}
          handleRemove={handleRemove}
          handleToggle={handleToggle}
        />
      </div>
      <div>
        {file !== null ? (
          <ViewConfig
            ref={codeRef}
            file={file}
            handleSaveConfig={handleSaveConfig}
            handleClearFile={handleClearFile}
          />
        ) : (
          <ImportExportRequest
            handleImport={handleImport}
            handleExport={handleExport}
          />
        )}
      </div>
    </div>
  );
};

export default Request;
