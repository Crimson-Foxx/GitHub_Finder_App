import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();
const github_URL = process.env.REACT_APP_GITHUB_URL;
const github_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${github_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${github_TOKEN}`,
      },
    });
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${github_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${github_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };
  const setClear = () => {
    dispatch({
      type: "SET_CLEAR",
    });
  };

  //getuserrepos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${github_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${github_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        setClear,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
