import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Preloader } from "./components";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

import Layout from "./layout/layout";
import { AuthForm, IRegistrationForm } from "./models/User";
import {
  AuthPage,
  MessagesPage,
  PaymentPage,
  ProfileEditPage,
  ProfilePage,
  QRpage,
  RegisterPage,
  TransactionsPage,
  WithdrawalPage,
  NewsPage
} from "./pages";
import {
  chekAuth,
  createUser,
  login,
  logout,
  selectAuthChecking,
  selectUserData,
} from "./store/user/userSlice";
import { ThemeProvider } from "./ThemeContext";

interface ThemeProviderProps {
  theme: "light" | "dark";
}

function App() {
  const authChecking = useAppSelector(selectAuthChecking);
  const userData = useAppSelector(selectUserData);
  const currentTheme = useAppSelector((state) => state.theme.theme); // Get the current theme from the store

  const dispatch = useAppDispatch();

  const handleSignup = (formData: IRegistrationForm) => {
    dispatch(createUser(formData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = (formData: AuthForm) => {
    dispatch(login(formData));
  };

  const themeProviderProps: ThemeProviderProps = {
    theme: currentTheme,
  };

  useEffect(() => {
    const initApp = () => {
      dispatch(chekAuth());
    };

    initApp();
  }, [dispatch]);

  if (authChecking) {
    return <Preloader />;
  }

  return (
    <ThemeProvider {...themeProviderProps}>
      <Routes>
        {userData ? (
          <>
            <Route path="app" element={<Layout showFooter={true}><QRpage /></Layout>} />
            <Route path="app/payment/:id" element={<Layout showFooter={true}><PaymentPage isInside /></Layout>} />
            <Route path="/payment/:id" element={<Layout showFooter={true}><PaymentPage isInside /></Layout>} />
            <Route path="withdrawal" element={<Layout showFooter={true}><WithdrawalPage /></Layout>} />
            <Route path="/news" element={<Layout showFooter={true}><NewsPage /></Layout>} />
            <Route
              path="messager"
              element={<Layout showFooter={false}><MessagesPage /></Layout>}
            />
            <Route
              path="profile"
              element={<Layout showFooter={true}><ProfilePage logout={handleLogout} /></Layout>}
            />
            <Route path="profile/edit" element={<Layout showFooter={false}><ProfileEditPage /></Layout>} />
            <Route path="*" element={<Navigate to="/app" />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<AuthPage login={handleLogin} />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route
              path="/register"
              element={<RegisterPage signUp={handleSignup} />}
            />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
