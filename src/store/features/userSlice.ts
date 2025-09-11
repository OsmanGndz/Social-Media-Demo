import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string;
    name: string;
    username: string;
    email: string;
}

const initialState = {
    users: [] as User[],
    selectedUser: localStorage.getItem("selectedUser")
        ? JSON.parse(localStorage.getItem("selectedUser") || "{}")
        : {} as User,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    
    setSelectedUser: (state, action: PayloadAction<string>) => {
      const user = state.users.find((u) => u.id === action.payload);
      state.selectedUser = user ? user : state.selectedUser;
      localStorage.setItem("selectedUser", JSON.stringify(state.selectedUser));
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteUser: (state, action:PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});

export const { setUsers, setSelectedUser, addNewUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;