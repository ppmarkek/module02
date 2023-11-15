import { useNavigate } from 'react-router-dom';
import { Result } from '../../types';
import './styles.css';

export const SearchItemCard = ({ details }: { details: Result }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/details/${details.id}`)}
      className="searchItemCard"
      data-testid="search-item-card"
    >
      <h3>Name: {details.name}</h3>
      <p>Created: {details.createdAt}</p>
      <p>Edited: {details.updatedAt}</p>
      {details.height && <p>Height: {details.height}</p>}
      {details.mass && <p>Mass: {details.mass}</p>}
    </div>
  );
};
