'use client';

import { ReactNode, useEffect } from 'react';

import { useRandomUserStore } from '@/shared/stores';

type UserProviderProps = {
  children: ReactNode;
};
export const UserProvider = ({ children }: UserProviderProps) => {
  const createUser = useRandomUserStore((state) => state.createUser);

  useEffect(() => {
    createUser();
  }, []);

  return children;
};
