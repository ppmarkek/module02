import { useNavigate } from 'react-router-dom';
import { Result } from '../../types';
import './styles.css';
import { useDispatch } from 'react-redux';
import {
  setDetails,
  setIsDetailsLoading,
  setIsShowDetails,
} from '../../redux/componentsReducer';
import { getDetailsById } from '../../requests';
import { useSearch } from '../../useSearch';

export const SearchItemCard = ({
  details,
  number,
}: {
  details: Result;
  number: number;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResult } = useSearch();
  const handleClick = () => {
    dispatch(setIsDetailsLoading(true));
    navigate(`/details/${details.id}`);
    dispatch(setIsShowDetails(true));
    getDetailsById({ id: details.id, inputValue: searchResult }).then(
      (response) => {
        dispatch(setDetails(response));
        dispatch(setIsDetailsLoading(false));
      }
    );
  };
  return (
    <div
      onClick={() => handleClick()}
      className="searchItemCard"
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
