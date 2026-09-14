import ThreadItem from '../components/threads/ThreadItem';

export default {
  title: 'Components/Threads/ThreadItem',
  component: ThreadItem,
  argTypes: {
    onUpVote: { action: 'onUpVote clicked' },
    onDownVote: { action: 'onDownVote clicked' },
  },
};

export const Default = {
  args: {
    id: 'thread-1',
    title: 'Bagaimana cara optimasi React dengan useMemo dan useCallback?',
    body: 'Dalam proyek React skala besar, optimasi performa sangat penting. Artikel ini membahas cara kerja useMemo dan useCallback serta kapan sebaiknya digunakan.',
    category: 'react',
    createdAt: '2023-05-29T07:55:52.266Z',
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: [],
    totalComments: 5,
    user: {
      id: 'user-1',
      name: 'Dimas Maulana',
      avatar: 'https://ui-avatars.com/api/?name=Dimas+Maulana&background=6366f1&color=fff',
    },
    authUserId: 'user-1',
  },
};

export const Downvoted = {
  args: {
    id: 'thread-2',
    title: 'Mengapa Redux Toolkit lebih direkomendasikan dibanding Redux murni?',
    body: 'Redux Toolkit menyederhanakan konfigurasi store, reducers dengan Immer, dan thunk actions secara out of the box.',
    category: 'redux',
    createdAt: '2023-05-30T10:15:00.000Z',
    upVotesBy: [],
    downVotesBy: ['user-1'],
    totalComments: 2,
    user: {
      id: 'user-2',
      name: 'Jane Doe',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=ec4899&color=fff',
    },
    authUserId: 'user-1',
  },
};
