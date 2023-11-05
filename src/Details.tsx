import { DetailsType } from './types';
import './App.css';

type DetailsProps = {
  detailsInfo?: DetailsType;
  onClickClose?: () => void;
};

export const Details = ({ detailsInfo, onClickClose }: DetailsProps) => {
  const handleCloseClick = () => {
    if (onClickClose) {
      onClickClose();
    }
  };

  return (
    <div className={'RightCart'}>
      <div className={'Cart'}>
        <h3>Name: {detailsInfo?.name}</h3>
        <p>Created: {detailsInfo?.createdAt}</p>
        <p>Edited: {detailsInfo?.updatedAt}</p>
        <p>Height: {detailsInfo?.height}</p>
        <p>Mass: {detailsInfo?.mass}</p>
      </div>
      <button id={'close'} onClick={handleCloseClick}>
        X
      </button>
    </div>
  );
};
