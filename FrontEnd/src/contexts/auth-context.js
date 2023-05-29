import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_ADMIN: 'SIGN_IN_ADMIN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_IN_ADMIN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
  //   fetch('http://localhost:3001/sign-in', { // backend address
  //       method: 'POST',
  //       body: JSON.stringify({email, password}),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //   })
  // .then((response) => {
  //     console.log(response.status)
  //     response.json()
  //       .then((user) => {
  //         localStorage.user = JSON.stringify({ // localStorage ??? (sessionStorage)
  //           id: user.id,
  //           avatar: user.avatar,
  //           name: user.name,
  //           email: user.email,
  //           authorization: 'Basic ' + window.btoa(email + ":" + password)
  //         })
  //       }).catch(err=>console.log(err))
  // });
    
    if (email !== 'demo@devias.io' || password !== 'Password123!') {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signInAdmin = async (email, password) => {

  //   fetch('http://localhost:3001/admin/sign-in', { // backend address
  //       method: 'POST',
  //       body: JSON.stringify({email, password}),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //   })
  // .then((response) => {
  //     console.log(response.status)
  //     response.json()
  //       .then((user) => {
  //         localStorage.user = JSON.stringify({ // localStorage ??? (sessionStorage)
  //           id: user.id,
  //           avatar: user.avatar,
  //           name: user.name,
  //           email: user.email,
  //           authorization: 'Basic ' + window.btoa(email + ":" + password)
  //         })
  //       }).catch(err=>console.log(err))
  // });
    
  // authentykacja po stronie serwera
    if (email !== 'demo@devias.io' || password !== 'Password123!') {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    // przypisanie z odpowiedzi z serwera
    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    }

   
    dispatch({
      type: HANDLERS.SIGN_IN_ADMIN,
      payload: user
    });
  };

  const signUp = async (email, name, password) => {
    
    // const signUpData = {
    //     name: name,
    //     email: email,
    //     password: password
    // };

    // fetch('http://localhost:3001/sign-up', { // backend address
    //   method: 'POST',
    //   body: JSON.stringify(signUpData),
    //   headers: {
    //           'Content-Type': 'application/json'
    //         }
    //   }).then((response) => {
    //         if (response.value === 200)
    //           statusMessage.value = 'Sign up successful'
    //         else
    //           statusMessage.value = `Sign up unsuccessful - ${response.message}`
    //         console.log(response.status)
    //   });
    
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signInAdmin,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
