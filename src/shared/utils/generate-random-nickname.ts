'use client';

import { ADJECTIVES, ANIMALS } from '@/shared/constants';

export const generateRandomNickname = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const number = Math.floor(1000 + Math.random() * 9000); // 4자리 랜덤 숫자

  return `${adj}${animal}${number}`;
};
