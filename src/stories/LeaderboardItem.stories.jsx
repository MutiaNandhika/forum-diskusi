import LeaderboardItem from '../components/leaderboards/LeaderboardItem';

export default {
  title: 'Components/Leaderboards/LeaderboardItem',
  component: LeaderboardItem,
};

export const RankOne = {
  args: {
    user: {
      id: 'user-1',
      name: 'Dimas Maulana',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas+Maulana&background=6366f1&color=fff',
    },
    score: 450,
    rank: 1,
  },
};

export const RankTwo = {
  args: {
    user: {
      id: 'user-2',
      name: 'Arif Faizin',
      email: 'arif@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Arif+Faizin&background=10b981&color=fff',
    },
    score: 320,
    rank: 2,
  },
};

export const RankOther = {
  args: {
    user: {
      id: 'user-4',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=8b5cf6&color=fff',
    },
    score: 110,
    rank: 4,
  },
};
