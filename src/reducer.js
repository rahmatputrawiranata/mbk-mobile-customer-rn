export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'LOAD_APP':
      return {
        ...prevState,
        isLoading: true,
        isSignedOut: false,
        isSignedUp: false,
        noAccount: false,
        isSignedIn: false,
        userToken: null,
      };
    case 'TO_SIGNUP_PAGE':
      return {
        ...prevState,
        isLoading: false,
        isSignedUp: true,
        noAccount: true,
      };
    case 'TO_SIGNIN_PAGE':
      return {
        ...prevState,
        isLoading: false,
        isSignedUp: false,
        isSignedIn: false,
        noAccount: false,
      };
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        userProfile: action.user,
      };
    case 'SIGNED_UP':
      return {
        ...prevState,
        isSignedIn: true,
        isSignedUp: true,
        isLoading: false,
        userToken: action.token,
        userProfile: action.user,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignedOut: false,
        isSignedIn: true,
        isSignedUp: true,
        userToken: action.token,
        userProfile: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        userToken: null,
        userProfile: null,
        isSignedOut: true,
        isSignedIn: false,
        isSignedUp: false,
      };
  }
};

export const initialState = {
  isLoading: true,
  isSignedOut: false,
  isSignedUp: false,
  noAccount: false,
  isSignedIn: false,
  userToken: null,
  userProfile: null,
};
