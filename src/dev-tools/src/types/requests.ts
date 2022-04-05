export interface IRequest {
  label: Requests;
  value: Requests;
}

export enum Requests {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
