
type user = {
  id: string;
  name: string;
  email: string;
}

type createUserReturnType = {
  user?: user;
  code_status: 'success' | 'error';
  message: string;
  access_token?: string;
  details?: string;
}

export default createUserReturnType;