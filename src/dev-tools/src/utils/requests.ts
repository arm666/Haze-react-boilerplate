import { SingleValue } from 'react-select';
import { IRequest, Requests } from '../types/requests';

const requests: Requests[] = [
  Requests.GET,
  Requests.POST,
  Requests.PUT,
  Requests.DELETE,
];

export const methods: IRequest[] = requests.map((method) => ({
  label: method,
  value: method,
}));

export const defaultRequestValue = methods.find(
  (x) => x.value === 'GET'
) as SingleValue<IRequest>;
