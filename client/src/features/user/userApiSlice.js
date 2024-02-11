import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all permissions
export const getAllpermission = createAsyncThunk(
  "user/getAllpermission",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4040/api/v1/permission`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

// create a new permissions
export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4040/api/v1/permission`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delete a permissions
export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/v1/permission/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

// update permission status
export const updatePermissionStatus = createAsyncThunk(
  "user/updatePermissionStatus",
  async ({ status, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4040/api/v1/permission/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

//----------------------Roles API Slice Start ------------------------//

// get all roles
export const getAllroles = createAsyncThunk("user/getAllroles", async () => {
  try {
    const response = await axios.get(`http://localhost:4040/api/v1/role`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

// create a new role
export const createRole = createAsyncThunk("user/createRole", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:4040/api/v1/role`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.error);
  }
});

// update role
export const updateRole = createAsyncThunk("user/updateRole", async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:4040/api/v1/role/${data.id}`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

// Delete role
export const deleteRole = createAsyncThunk("user/deleteRole", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4040/api/v1/role/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

// update role status
export const updateRoleStatus = createAsyncThunk(
  "user/updateRoleStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4040/api/v1/role/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

// get all users
export const getAllUsers = createAsyncThunk("user/getAlluser", async () => {
  try {
    const response = await axios.get(`http://localhost:4040/api/v1/user`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

// create a user from dashboard
export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:4040/api/v1/user`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4040/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// update user from dashboard
export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const response = await axios.patch(
      `http://localhost:4040/api/v1/user/user-update/${data.id}`,
      {
        name: data.name,
        role: data.role,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// update user status
export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4040/api/v1/user/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
