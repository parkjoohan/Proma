import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";

//state type
export type ProjectState = {
  projectList: Array<Object>;
  projectName: string;
};
//state
const initialState: ProjectState = {
  projectList: [],
  projectName: "",
};

//dummy token
// const code = dcf540639e700cd1c876
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3TthqDtgbAiLCJ1c2VyTm8iOiI3R3djUGxwbzNaUGhnVEUiLCJleHAiOjE2NTE1Nzg4OTJ9.4L5Bzg6H_FNFlIo2adOQUDhPCrBe1vsVGaY5njJj5DypZK1PTZoU999kP6Xns2jwEzpsr8TaW0yMA7ibj4t47A";

//get every project api
export const getProjectList = createAsyncThunk(
  "GET/PROJECTS",
  async (_, { rejectWithValue }) => {
    return await axios
      .get(`${BACKEND_URL}/project`, {
        headers: {
          JWT: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

//get one project api
export const getProjectInfo = createAsyncThunk(
  "GET/PROJECT",
  async (projectNo: string, { rejectWithValue }) => {
    return await axios
      .get(`${BACKEND_URL}/project/${projectNo}`, {
        headers: {
          JWT: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

//post project api
export const postNewProject = createAsyncThunk(
  "POST/PROJECT",
  async (newProjectInfo: any, thunkAPI) => {
    return await axios
      .post(`${BACKEND_URL}/project`, newProjectInfo, {
        headers: {
          JWT: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("An invitation email has been sent to the members.");
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//update project api
export const updateProjectInfo = createAsyncThunk(
  "PUT/PROJECT",
  async (newProjectInfo: any, thunkAPI) => {
    return await axios
      .put(`${BACKEND_URL}/project/change`, newProjectInfo, {
        headers: {
          JWT: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("project is updated", res);

        thunkAPI.dispatch(getProjectInfo(newProjectInfo.projectNo));
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//delete project api
export const deleteProject = createAsyncThunk(
  "DELETE/PROJECT",
  async (_, { rejectWithValue }) => {
    return await axios
      .delete(`${BACKEND_URL}/project/change`, {
        headers: {
          JWT: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("project is deleted", res);
      })
      .catch((err) => rejectWithValue(err.response.data));
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectList.fulfilled, (state, { payload }) => {
        state.projectList = payload.projectList;
      })
      .addCase(getProjectInfo.fulfilled, (state, { payload }) => {
        state.projectName = payload.project.title;
      });
  },
});

export default projectSlice.reducer;
