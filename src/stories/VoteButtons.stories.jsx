import VoteButtons from '../components/votes/VoteButtons';

export default {
  title: 'Components/Votes/VoteButtons',
  component: VoteButtons,
  argTypes: {
    onUpVote: { action: 'onUpVote clicked' },
    onDownVote: { action: 'onDownVote clicked' },
  },
};

export const Neutral = {
  args: {
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: ['user-4'],
    authUserId: 'user-1',
  },
};

export const Upvoted = {
  args: {
    upVotesBy: ['user-1', 'user-2', 'user-3'],
    downVotesBy: [],
    authUserId: 'user-1',
  },
};

export const Downvoted = {
  args: {
    upVotesBy: [],
    downVotesBy: ['user-1'],
    authUserId: 'user-1',
  },
};
