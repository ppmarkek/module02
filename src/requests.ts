import axios from 'axios';

const API_URL = 'https://backend.dreamdev.lv';

export const getAllRequestedResults = async ({
  searchCriteria,
  page = '1',
  size = '10',
}: {
  searchCriteria: string;
  page?: string;
  size?: string;
}) => {
  const request = await axios.get(
    `${API_URL}/api/${searchCriteria}/?page=${page}&size=${size}`
  );
  return request.data;
};

export const getCategories = async () => {
  const request = await axios.get(API_URL);
  return request.data;
};

export const getDetailsById = async ({
  id,
  inputValue,
}: {
  id: string;
  inputValue: string;
}) => {
  const request = await axios.get(`${API_URL}/api/${inputValue}/${id}`);
  return request.data;
};
