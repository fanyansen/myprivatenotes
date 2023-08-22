import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse } from "../../../generated/graphql";
import { LoginState, UserLogin } from "./types";
import { PickNullable } from "../../../types/custom";
import { RootState } from "../../store";

const initialState: LoginState = {
  loading: false,
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const login = createAsyncThunk<PickNullable<LoginResponse>, UserLogin>(
  "users/login",
  async (params: UserLogin, { rejectWithValue }) => {
    const { data: paramData, mutate } = params;

    try {
      const { data, errors } = await mutate({
        variables: { ...paramData },
        errorPolicy: "all",
      });

      if (errors) {
        // Handle GraphQL errors
        const errorMessage = errors.map((error) => error.message).join(", ");
        return rejectWithValue(errorMessage);
      }

      return data?.login;
    } catch (error) {
      const errorObj = error as Error;
      // Catch other network or server errors
      return rejectWithValue(
        "An error occurred while login: " + errorObj.message
      );
    }
  }
);

const userLoginSlice = createSlice({
  name: "usersLogin",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;

        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;

        console.log(action);
        state.error = action.payload as string;
      });
  },
});

export const selectorState = (state: RootState) => state.login;

export default userLoginSlice.reducer;
