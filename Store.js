import { configureStore } from "@reduxjs/toolkit";
import registerationReducer from "./Containers/RegisterationSlice";
import loginReducer from "./Containers/LoginSlice";
import likeReducer from './Containers/PostLikeSlice';
import feedReducer from './Containers/GetFeedsSlice';
const store = configureStore({
  reducer: {
    registerationReducer,
    loginReducer,
    likeReducer,
    feedReducer,
  },
});

export default store;
