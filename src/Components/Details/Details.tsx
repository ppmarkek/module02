import { Results } from '../../types';
import '../Search/style.css';

type DetailsProps = {
  detailsInfo?: Results;
  onClickClose?: () => void;
};

export const Details = ({ detailsInfo, onClickClose }: DetailsProps) => {
  return (
    <div className={'RightCart'}>
      <div className={'Cart'}>
        <h3 data-testid="name">Name: {detailsInfo?.name}</h3>
        <p>Created: {detailsInfo?.createdAt}</p>
        <p>Edited: {detailsInfo?.updatedAt}</p>
        <p>Height: {detailsInfo?.height}</p>
        <p>Mass: {detailsInfo?.mass}</p>
      </div>
      <button data-testid="close-icon" id={'close'} onClick={onClickClose}>
        X
      </button>
    </div>
  );
};
