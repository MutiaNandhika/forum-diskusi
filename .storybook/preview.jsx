import '../src/index.css';
import { MemoryRouter } from 'react-router-dom';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f172a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: '640px', margin: '2rem auto', padding: '1rem' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default preview;
