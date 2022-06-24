import Swal from "sweetalert2";

const types = {
  authCheckingFinish: "[auth] Finish checking login state",
  authLogin: "[auth] Login",
  authLogout: "[auth] Logout",
};
export const startLogin = (email: any, password: any) => {
  return async (dispatch: any) => {
    const body = {} as any;
    //console.log(JSON.stringify(body));
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        authLogin({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};
//We need check with ONE action if we have in local store, token and check y that is valid.
export const startChecking = () => {
  return async (dispatch: any) => {
    const body = {} as any;

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        authLogin({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const startRegister = (email: any, password: any, name: any) => {
  return async (dispatch: any) => {
    const body = {} as any;
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        authLogin({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};
const authLogin = (user: any) => ({
  type: types.authLogin,
  payload: user,
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch: any) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
