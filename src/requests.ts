import axios from 'axios';

const API_URL = 'https://backend.dreamdev.lv/api';

export const fetchAllData = async ({
  inputValue,
  page,
  size,
}: {
  inputValue: string;
  page: number;
  size: number;
}) => {
  await axios.get(`${API_URL}/${inputValue}/?page=${page}&size=${size}`);
};

export const fetchDataById = async ({
  id,
  inputValue,
}: {
  id: string;
  inputValue: string;
}) => {
  await axios.get(`${API_URL}/${inputValue}/${id}`);
};
