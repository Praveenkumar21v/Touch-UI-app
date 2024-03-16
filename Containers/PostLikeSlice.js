import { createSlice } from "@reduxjs/toolkit";

const likeSlice=createSlice({
    name:'likes',
    initialState:{
        likes:0
    },
    reducers:{
        incrementLikes:state=>{
            state.likes+=1;
        },
          decrementLikes:state=>{
            state.likes-=1;
        }
    }
})

export const {incrementLikes,decrementLikes}=likeSlice.actions;
export default likeSlice.reducer;
