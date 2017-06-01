// @flow
import axios from 'axios';
import { fetchPublicHoliday } from '../actions/PublicHoliday';

export const DELETE_PUBLIC_HOLIDAY_REQUEST = 'DELETE_PUBLIC_HOLIDAY_REQUEST';
export const DELETE_PUBLIC_HOLIDAY_SUCCESS = 'DELETE_PUBLIC_HOLIDAY_SUCCESS';
export const DELETE_PUBLIC_HOLIDAY_FAILURE = 'DELETE_PUBLIC_HOLIDAY_FAILURE';
export const CLEAR_DELETE_PUBLIC_MESSAGE = 'CLEAR_DELETE_PUBLIC_MESSAGE';

export const requestDeletePublicHoliday = (archiveUser: Object) => {
  return { type: DELETE_PUBLIC_HOLIDAY_REQUEST, archiveUser };
};

export const successDeletePublicHoliday = (data: Object) => {
  return { type: DELETE_PUBLIC_HOLIDAY_SUCCESS, message: data.message };
};

export const failureDeletePublicHoliday = (data: Object) => {
  return { type: DELETE_PUBLIC_HOLIDAY_FAILURE, message: data.message };
};

export const clearpublicMessage = () => ({ type: CLEAR_DELETE_PUBLIC_MESSAGE });

export const submitDeletePublicHoliday = (
  deletePublicHolidayDate: Object
) => async (dispatch: Function) => {
  try {
    dispatch(requestDeletePublicHoliday(deletePublicHolidayDate));
    const response = await axios.post(
      'http://localhost:8080/deletepublicholiday',
      {
        id: deletePublicHolidayDate.id
      }
    );

    if (response.status !== 201) {
      dispatch(failureDeletePublicHoliday(response.data));
    } else {
      dispatch(successDeletePublicHoliday(response.data));
      dispatch(fetchPublicHoliday());
    }
  } catch (error) {
    console.log(error);
  }
};
