'use client';

import { useRandomUserStore } from '@/shared/stores';
import { ReactNode, useEffect } from 'react';

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
