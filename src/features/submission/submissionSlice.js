import { createSlice, createSelector } from "@reduxjs/toolkit";

export const submissionSlice = createSlice({
  name: 'submission',
  initialState: {
    submissionMessage: false,
  },
  reducers: {
    hideSubmissionMessage: (state) => {
      state.submissionMessage = false;
    },
    showSubmissionMessage: (state) => {
      console.log("submissionMessage = true");
      state.submissionMessage = true;
    },
  },
})

// Action creators are generated for each case reducer function
export const { hideSubmissionMessage, showSubmissionMessage } = submissionSlice.actions
export const selectSubmissionSlice = (state) => state?.submission;
export const displaySubmissionMessage = createSelector(selectSubmissionSlice, (state) => state.submissionMessage)
export default submissionSlice.reducer