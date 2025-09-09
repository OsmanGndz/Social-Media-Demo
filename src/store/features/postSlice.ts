import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface Post {
    id: string;
    userId: string;
    title: string;
    body: string;
}
const initialState = {
    posts: [] as Post[],
    userPosts: [] as Post[],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setUserPosts: (state, action: PayloadAction<Post[]>) => {
            state.userPosts = action.payload;
        },
    
    }
})

export const {setUserPosts} = postSlice.actions;
export default postSlice.reducer;