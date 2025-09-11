import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface Post {
    id: string;
    userId: string;
    title: string;
    body: string;
}
const initialState = {
    posts: JSON.parse(localStorage.getItem("posts") || "[]") || [] as Post[],
    userPosts: JSON.parse(localStorage.getItem("userPosts") || "[]") || [] as Post[],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setUserPosts: (state, action: PayloadAction<Post[]>) => {
            state.userPosts = action.payload;
        },
        setPosts: (state, action: PayloadAction<Post[]>) =>{
            state.posts = action.payload;
            localStorage.setItem("posts", JSON.stringify(state.posts))
        },
        addNewPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
            localStorage.setItem("posts", JSON.stringify(state.posts));
        },
        deletePost: (state, action:PayloadAction<string>) => {
              state.posts = state.posts.filter((post:Post) => post.id !== action.payload);
              localStorage.setItem("posts", JSON.stringify(state.posts));
            },
        updatePost: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex((post: Post) => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
                localStorage.setItem("posts", JSON.stringify(state.posts));
            }
        },
    
    }
})

export const {setUserPosts, setPosts, addNewPost, deletePost, updatePost} = postSlice.actions;
export default postSlice.reducer;