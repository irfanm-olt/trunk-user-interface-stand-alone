import * as Actions from "./constants";

/**
 * Action login
 * @param username
 * @param password
 * @returns {{type: string, username: *, password: *}}
 */
export function SignInWithEmail({ email, password }) {
    return {
        type: Actions.SIGN_IN_WITH_EMAIL,
        email,
        password
    }
}

/**
 * Action sign out
 */
export function SignOut() {
    return {
        type: Actions.SIGN_OUT,
    };
}


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: Actions.SET_CURRENT_USER,
    payload: decoded
  };
};


