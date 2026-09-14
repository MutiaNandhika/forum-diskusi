export const ActionType = {
  SET_FILTER_CATEGORY: 'filterCategory/set',
  CLEAR_FILTER_CATEGORY: 'filterCategory/clear',
};

export function setFilterCategoryActionCreator(category) {
  return {
    type: ActionType.SET_FILTER_CATEGORY,
    payload: {
      category,
    },
  };
}

export function clearFilterCategoryActionCreator() {
  return {
    type: ActionType.CLEAR_FILTER_CATEGORY,
  };
}
