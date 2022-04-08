import { SingleValue } from 'react-select';
import { baseURL } from '../lib/axios';
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

export const findRequestValue = (method: Requests) =>
  methods.find((x) => x.value === method) as SingleValue<IRequest>;

export const removeBaseURL = (url: string) => url.replace(baseURL, '');
