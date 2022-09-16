import { configureStore } from '@reduxjs/toolkit'
import submissionSlice from "../features/submission/submissionSlice";

export default configureStore({
  reducer: {
    submission: submissionSlice,
  },
})