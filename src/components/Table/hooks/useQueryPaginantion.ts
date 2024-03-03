import { sanitize } from '@/helpers/sanitize';
import { useSearchParams } from 'next/navigation';

export const useQueryPagination = () => {
  const { get } = useSearchParams();

  return {
    page: +sanitize(get('page')),
    pageSize: +sanitize(get('pageSize')),
  };
};
