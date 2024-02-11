import { createSlice } from "@reduxjs/toolkit";
import {
  createPermission,
  createRole,
  createUser,
  deletePermission,
  deleteRole,
  deleteUser,
  getAllUsers,
  getAllpermission,
  getAllroles,
  updatePermissionStatus,
  updateRole,
  updateRoleStatus,
  updateUser,
  updateUserStatus,
} from "./userApiSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    role: null,
    user: [],
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllpermission.fulfilled, (state, action) => {
        state.permission = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getAllpermission.rejected, (state, action) => {
        console.log(action);
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.permission.push(action.payload.permission);
        state.message = action.payload.message;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permission = state.permission.filter(
          (data) => data._id !== action.payload.permission._id
        );
        state.message = action.payload.message;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatus.fulfilled, (state, action) => {
        state.permission[
          state.permission.findIndex(
            (data) => data._id === action.payload.permission._id
          )
        ] = action.payload.permission;

        state.message = action.payload.message;
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllroles.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = action.payload;
      })
      .addCase(getAllroles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.message = action.payload.message;
        state.role.push(action.payload.role);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = "This role already exists";
        console.log(action);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role[
          state.role.findIndex(
            (data) => data._id == action.payload.updatedRole._id
          )
        ] = action.payload.updatedRole;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.role = state.role.filter(
          (data) => data._id !== action.payload.role._id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRoleStatus.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id === action.payload.role._id)
        ] = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = state.user ?? [];
        state.user.push(action.payload.user);
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter(
          (data) => data._id !== action.payload.user._id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex((data) => data._id === action.payload.user._id)
        ] = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex(
            (item) => item._id === action.payload.user._id
          )
        ] = action.payload.user;
        state.message = action.payload.message;
      });
  },
});

// selectors
export const getAllUserPermission = (state) => state.user;

// actions
export const { setMessageEmpty } = userSlice.actions;

// default export
export default userSlice.reducer;
