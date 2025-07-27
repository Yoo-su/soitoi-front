import { Work } from '../types';

type DomainInfo = {
  bannerColor: string;
  title: string;
};
export const STATUS_DOMAIN_INFO: Record<Work['status'], DomainInfo> = {
  planned: {
    bannerColor: '#89E3F4',
    title: '진행 예정',
  },
  in_progress: {
    bannerColor: '#F4E789',
    title: '진행중',
  },
  done: {
    bannerColor: '#89F48F',
    title: '진행 완료',
  },
};
