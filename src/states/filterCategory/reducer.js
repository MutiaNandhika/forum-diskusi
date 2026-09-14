import { ActionType } from './action';

export default function filterCategoryReducer(
  filterCategory = '',
  action = {}
) {
  switch (action.type) {
  case ActionType.SET_FILTER_CATEGORY:
    return action.payload.category;
  case ActionType.CLEAR_FILTER_CATEGORY:
    return '';
  default:
    return filterCategory;
  }
}
