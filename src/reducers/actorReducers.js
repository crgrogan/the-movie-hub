import * as actions from "../actions/types";

export const actorReducers = (
  state = { actorDetails: {}, isLoading: true },
  action
) => {
  switch (action.type) {
    case actions.ACTOR_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.ACTOR_DETAILS_SUCCESS:
      return {
        ...state,
        actorDetails: action.payload,
        isLoading: false,
      };
    case actions.ACTOR_DETAILS_FAILED:
      return { ...state, actorDetails: {}, isLoading: false };
    default:
      return state;
  }
};
