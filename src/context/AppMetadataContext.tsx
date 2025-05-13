'use client';
import React, { createContext, useContext } from 'react';

type AppMetadata = {
  APP_NAME: string;
  OAUTH_PROVIDERS: string[];
  SIGNUP_IMG_LINK: string;
};

const AppMetadataContext = createContext<AppMetadata | null>(null);

export const AppMetadataProvider = ({ children }: { children: React.ReactNode }) => {
  const metadata: AppMetadata = {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'MyApp',
    OAUTH_PROVIDERS: process.env.NEXT_PUBLIC_AUTH_PROVIDERS?.split(",") || [],
    SIGNUP_IMG_LINK: process.env.NEXT_SIGNUP_PAGE_IMAGELINK || 'https://c.stocksy.com/a/T8p600/z9/1626537.jpg'
  };

  return (
    <AppMetadataContext.Provider value={metadata}>
      {children}
    </AppMetadataContext.Provider>
  );
};

export const useAppMetadata = () => {
  const context = useContext(AppMetadataContext);
  if (!context) throw new Error("useAppMetadata must be used within AppMetadataProvider");
  return context;
};
