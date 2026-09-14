import RegisterInput from '../components/auth/RegisterInput';

export default {
  title: 'Components/Auth/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    register: { action: 'register clicked' },
  },
};

export const Default = {
  args: {
    register: (creds) => console.log('Register credentials submitted:', creds),
  },
};
