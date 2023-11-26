import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import { setIsShowDetails } from '../../redux/componentsReducer';
import { useSearch } from '../../useSearch';
import { useRouter } from 'next/router';

export const DetailsCard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { details, isDetailsLoading, isShowDetails } = useSearch();

  const closeDetails = () => {
    router.push('/');
    dispatch(setIsShowDetails(false));
  };

  return (
    isShowDetails && (
      <div>
        <div className={styles.detailsCard} data-testid="details-card">
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
            className={styles.closeDetailsButton}
            data-testid="close-details"
            onClick={() => closeDetails()}
          >
            X
          </button>
        </div>

        <div
          data-testid="details-shadow-background"
          className={styles.closeDetails}
          onClick={() => closeDetails()}
        />
      </div>
    )
  );
};
