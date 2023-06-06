import {API_ROOMS} from 'constants/apiUrls';
import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import CODE from 'constants/errorCode';

const initialRooms = [];

const useRooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const jwtAxios = useInterceptedAxios();

  const getRooms = async filters => {
    try {
      const response = await jwtAxios.get(API_ROOMS, {
        params: {
          ...filters,
        },
      });
      const data = response?.data;
      if (!data) {
        throw new Error();
      }

      setRooms(() => data);
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;
      if (!errorCode) {
        return CODE.UNEXPECTED;
      }

      return errorCode;
    }
  };

  return {rooms, setRooms, getRooms};
};

export default useRooms;
