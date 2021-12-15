import request from '../../utils/fetch';

export const emailLogin = ({email, password}) =>
  request.post(`/users/login`, {email, password});
