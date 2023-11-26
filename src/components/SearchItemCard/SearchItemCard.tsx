import React from 'react';
import { useDispatch } from 'react-redux';
import { Result } from '../../types';
import styles from './styles.module.css';
import {
  setDetails,
  setIsDetailsLoading,
  setIsShowDetails,
} from '../../redux/componentsReducer';
import { getDetailsById } from '../../requests';
import { useSearch } from '../../useSearch';

type SearchItemCardProps = {
  details: Result;
  number: number;
};

export const SearchItemCard = ({ details, number }: SearchItemCardProps) => {
  const dispatch = useDispatch();
  const { searchResult } = useSearch();

  const handleClick = async () => {
    dispatch(setIsDetailsLoading(true));
    dispatch(setIsShowDetails(true));
    try {
      const response = await getDetailsById({
        id: details.id,
        inputValue: searchResult,
      });
      dispatch(setDetails(response));
      dispatch(setIsDetailsLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      className={styles.searchItemCard}
      data-testid={`search-item-card-${number}`}
    >
      <h3>Name: {details.name}</h3>
      <p>Created: {details.createdAt}</p>
      <p>Edited: {details.updatedAt}</p>
      {details.height && <p>Height: {details.height}</p>}
      {details.mass && <p>Mass: {details.mass}</p>}
    </div>
  );
};
