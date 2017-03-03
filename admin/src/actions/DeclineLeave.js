import axios from "axios";

export const DECLINE_LEAVE_REQUEST = "DECLINE_LEAVE_REQUEST";
export const DECLINE_LEAVE_SUCCESS = "DECLINE_LEAVE_SUCCESS";
export const DECLINE_LEAVE_ERROR = "DECLINE_LEAVE_ERROR";

export const requestDeclineLeave = () => ({
  type: DECLINE_LEAVE_REQUEST
});

export const receiveDeclineLeave = data => ({
  type: DECLINE_LEAVE_SUCCESS,
  message: data.message
});

export const errorDeclineLeave = data => ({
  type: DECLINE_LEAVE_ERROR,
  message: data.message
});

export function submitDeclineLeave(declineLeaveData) {
  return dispatch => {
    dispatch(requestDeclineLeave(declineLeaveData));
    axios
      .post("http://localhost:8080/declineleave", {
        leave_id: declineLeaveData.leaveID,
        LeaveStatus: declineLeaveData.LeaveStatus,
        DeclineReason: declineLeaveData.DeclineReason
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(errorDeclineLeave(response.data));
        } else {
          dispatch(receiveDeclineLeave(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}