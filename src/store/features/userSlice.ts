import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string;
    name: string;
}

const initialState = {
    users: [] as User[],
    selectedUser: { id: "", name: "Select User" } as User,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        
      setSelectedUser: (state, action: PayloadAction<string>) => {
      const user = state.users.find((u) => u.id === action.payload);
      state.selectedUser = user ? user : state.selectedUser;
    },
    }
})

export const {setSelectedUser, setUsers} = userSlice.actions;
export default userSlice.reducer;