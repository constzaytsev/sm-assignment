/**
 * Working with Supermetrics API
 */

import { setItem, getItem } from './localStorage'
import type { Post } from '../types/types'

type RegisterParams = {
  name: string;
  email: string;
};

// Might be excluded as constants.ts module for use across APP
const CONSTANTS = {
  API_REGISTER_URL: "https://api.supermetrics.com/assignment/register",
  API_FETCH_POSTS: "https://api.supermetrics.com/assignment/posts",
  API_CLIENT_ID: "ju16a6m81mhid5ue1z3v2g0uh",
  LOCALSTORAGE_KEY: "sm_user",
  TOKEN_EXPIRED_TIME: 3600, // 1 hour in seconds
  TOKEN_BEFORE_EXPIRED_TIME: 60, // 1 minute in seconds before Token expired
};

export function useApi() {

  let abortController: AbortController

  /**
   * Fetching posts by page number
   */
  const fetchPostsByPage = async (page: number = 0): Promise<Post[]> => {

    if(abortController) {
      abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    const userData = getItem(CONSTANTS.LOCALSTORAGE_KEY)
    if (!userData) throw new Error("Login issue");

    const token = userData.sl_token
    const tokenExpire = userData.token_expire_date as number

    if (!token || !tokenExpire ||
      (tokenExpire - new Date().getTime()) < CONSTANTS.TOKEN_BEFORE_EXPIRED_TIME * 1000) {
      throw new Error("Login issue");
    }

    let response = await fetch(`${CONSTANTS.API_FETCH_POSTS}?sl_token=${token}&page=${page}`, {signal});

    const { data } = await response.json()
    return data.posts
  }

  /**
   * Getting and save API token
   */
  const registerUser = async ({ name, email }: RegisterParams) => {
    const response = await fetch(CONSTANTS.API_REGISTER_URL, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: CONSTANTS.API_CLIENT_ID,
        name,
        email,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const { error } = await response.json()
          throw new Error(error.message);
        }
        return response;
      })
      .catch(error => {
        throw new Error(error.message);
      });

    const { data } = await response.json();
    setItem(CONSTANTS.LOCALSTORAGE_KEY, {
      ...data,
      token_expire_date: new Date().getTime() + CONSTANTS.TOKEN_EXPIRED_TIME * 1000
    });
  }

  return {
    fetchPostsByPage,
    registerUser
  }

}

