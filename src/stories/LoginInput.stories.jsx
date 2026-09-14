import LoginInput from '../components/auth/LoginInput';

export default {
  title: 'Components/Auth/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    login: { action: 'login clicked' },
  },
};

export const Default = {
  args: {
    login: (creds) => console.log('Login credentials submitted:', creds),
  },
};
