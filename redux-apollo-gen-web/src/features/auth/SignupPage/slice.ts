import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DaftarSiniMutation } from "../../../generated/graphql";
import { PickNullable } from "../../../types/custom";
import { RootState } from "../../store";
import { SignUpParams, SignUpState } from "./types";

const initialState: SignUpState = {
  loading: false,
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const signUp = createAsyncThunk<
  PickNullable<DaftarSiniMutation>,
  SignUpParams
>("users/signUp", async (params: SignUpParams, { rejectWithValue }) => {
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

    return data?.signUp;
  } catch (error) {
    const errorObj = error as Error;
    // Catch other network or server errors
    return rejectWithValue(
      "An error occurred while Sign Up: " + errorObj.message
    );
  }
});

const signUpSlice = createSlice({
  name: "usersSignUp",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;

        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;

        console.log(action);
        state.error = action.payload as string;
      });
  },
});

export const selectorState = (state: RootState) => state.signUp;

export default signUpSlice.reducer;
