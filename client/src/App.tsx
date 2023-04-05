import { authAPI } from "./api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/use.store";
import { useStorage } from "./hooks/use.storage";
import { useEffect } from "react";
import { IUserToken } from "./types/user";

import { MainLayout } from "./layouts/Main";
import { EmptyLayout } from "./layouts/Empty";

import { Home } from "./pages/Home";
import { Me } from "./pages/Me";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { authUserError, authUserSuccess } from "./store/reducers/user.slicer";

function App() {
  const { isAuth } = useAppSelector(state => state.user)
  const [token] = useStorage<IUserToken>("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(token);
    if (token) {
      authAPI
        .getMe(token)
        .then(({ data }) => {
          dispatch(authUserSuccess(data));
        })
        .catch((err) => {
          dispatch(authUserError(err.message));
        });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="me" element={<Me />} />
          </Route>
          {!isAuth ? 
            <Route path="/auth" element={<EmptyLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            : null
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
