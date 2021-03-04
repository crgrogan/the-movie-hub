export const actorReducers = (
  state = { actorDetails: {}, isLoading: true },
  action
) => {
  switch (action.type) {
    case "ACTOR_DETAILS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ACTOR_DETAILS_SUCCESS":
      return {
        ...state,
        actorDetails: action.payload,
        isLoading: false,
      };
    case "ACTOR_DETAILS_FAILED":
      return { ...state, actorDetails: {}, isLoading: false };
    default:
      return state;
  }
};
