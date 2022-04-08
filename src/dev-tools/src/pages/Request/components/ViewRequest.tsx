import React from 'react';
import { ICookie, IStoreRequest } from '..';
import Requests from '../../../components/Requests';

interface IViewRequest {
  cookies: ICookie;
  handleRemove: (key: string, request: IStoreRequest) => void;
  handleToggle: (key: string, request: IStoreRequest) => void;
}

const ViewRequest = ({ cookies, handleRemove, handleToggle }: IViewRequest) => {
  return (
    <React.Fragment>
      {Object.entries<IStoreRequest[]>(cookies.request || {}).map(
        ([url, requests]) =>
          requests.map((request) => (
            <Requests.View
              key={request.id}
              request={request}
              handleRemove={() => handleRemove(url, request)}
              handleToggle={() => handleToggle(url, request)}
            />
          ))
      )}
    </React.Fragment>
  );
};

export default ViewRequest;
