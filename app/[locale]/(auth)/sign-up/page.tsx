"use client";

import React, { useState } from "react";
import { SignUpViews } from "@/types/global";
import type { ConfirmationResult } from "@firebase/auth";
import SignUpForm from "./components/sign-up-form";
import OtpVerify from "@/app/[locale]/(auth)/sign-up/components/OtpVerify";
import Complete from "@/app/[locale]/(auth)/sign-up/components/complete";

function Page() {
  const [currentView, setCurrentView] = useState<SignUpViews>(SignUpViews.SIGNUP);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>();
  const [username, setUsername] = useState<string | undefined>();
  const [idToken, setIdToken] = useState<string | undefined>();
  const handleChangeView = (view: SignUpViews) => setCurrentView(view);
  switch (currentView) {
    case SignUpViews.SIGNUP:
      return (
        <SignUpForm
          onChangeView={handleChangeView}
          onSuccess={({ username, callback }) => {
            setUsername(username);
            setConfirmationResult(callback);
          }}
        />
      );
    case SignUpViews.VERIFY:
      return (
        <OtpVerify
          confirmationResult={confirmationResult}
          username={username}
          onChangeView={handleChangeView}
          onSuccess={(value) => setIdToken(value)}
        />
      );
    case SignUpViews.COMPLETE:
      return <Complete idToken={idToken} username={username} />;
    default:
      return (
        <SignUpForm
          onChangeView={handleChangeView}
          onSuccess={({ username, callback }) => {
            setUsername(username);
            setConfirmationResult(callback);
          }}
        />
      );
  }
}

export default Page;
