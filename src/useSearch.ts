import { useSelector } from 'react-redux';
import { AppState } from './types';

export const useSearch = () => {
  const requestResults = useSelector(
    (state: AppState) => state.componentsReducer.results
  );
  const isLoading = useSelector(
    (state: AppState) => state.componentsReducer.isLoading
  );
  const details = useSelector(
    (state: AppState) => state.componentsReducer.details
  );
  const searchResult = useSelector(
    (state: AppState) => state.componentsReducer.searchResult
  );

  const isDetailsLoading = useSelector(
    (state: AppState) => state.componentsReducer.isDetailsLoading
  );

  const isShowDetails = useSelector(
    (state: AppState) => state.componentsReducer.isShowDetails
  );

  const isError = useSelector(
    (state: AppState) => state.componentsReducer.isError
  );

  return {
    requestResults,
    isLoading,
    isDetailsLoading,
    details,
    searchResult,
    isShowDetails,
    isError,
  };
};
