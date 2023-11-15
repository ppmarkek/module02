import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailsById } from '../../requests';
import { ComponentsReducer } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { setDetails } from '../../redux/componentsReducer';

export const DetailsCard = () => {
  const { id } = useParams();
  const requestResults = useSelector(
    (state: ComponentsReducer) => state.componentsReducer.searchResult
  );
  console.log(requestResults);
  const dispatch = useDispatch();
  const details = useSelector(
    (state: ComponentsReducer) => state.componentsReducer.details
  );
  useEffect(() => {
    getDetailsById({ id: id!, inputValue: requestResults! }).then(
      (response) => {
        dispatch(setDetails(response));
      }
    );
  }, [id]);
  return (
    <div>
      {details && (
        <div className="details-card" data-testid="details-card">
          <div>
            {details?.name && <h3 data-testid="name">Name: {details?.name}</h3>}
            {details?.createdAt && <p>Created: {details?.createdAt}</p>}
            {details?.updatedAt && <p>Edited: {details?.updatedAt}</p>}
            {details?.height && <p>Height: {details?.height}</p>}
            {details?.mass && <p>Mass: {details?.mass}</p>}
          </div>

          <button
            className="close-details-button"
            onClick={() => dispatch(setDetails(undefined))}
          >
            X
          </button>
        </div>
      )}
      {details && (
        <div
          className="close-details"
          onClick={() => dispatch(setDetails(undefined))}
        />
      )}
    </div>
  );
};
