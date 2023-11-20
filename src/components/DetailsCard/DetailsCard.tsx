import { useDispatch } from 'react-redux';
import './styles.css';
import { setIsShowDetails } from '../../redux/componentsReducer';
import { useSearch } from '../../useSearch';
import { useNavigate } from 'react-router-dom';

export const DetailsCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { details, isDetailsLoading, isShowDetails } = useSearch();
  const closeDetails = () => {
    navigate(`/`);
    dispatch(setIsShowDetails(false));
  };
  return (
    isShowDetails && (
      <div>
        <div className="details-card" data-testid="details-card">
          {isDetailsLoading ? (
            <h3 data-testid="loading-details">Loading...</h3>
          ) : (
            <div>
              {details?.name && (
                <h3 data-testid="name">Name: {details?.name}</h3>
              )}
              {details?.createdAt && <p>Created: {details?.createdAt}</p>}
              {details?.updatedAt && <p>Edited: {details?.updatedAt}</p>}
              {details?.height && <p>Height: {details?.height}</p>}
              {details?.mass && <p>Mass: {details?.mass}</p>}
            </div>
          )}
          <button
            className="close-details-button"
            data-testid="close-details"
            onClick={() => closeDetails()}
          >
            X
          </button>
        </div>

        <div
          data-testid="details-shadow-background"
          className="close-details"
          onClick={() => closeDetails()}
        />
      </div>
    )
  );
};
