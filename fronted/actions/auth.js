import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from 'js-cookie';
import { useEffect, useState } from 'react'

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    console.log(error);
  });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signout = (next) => {
  removeCookie('token')
  rmeoveLocalStorage('user')
  next()

  return fetch(`${API}/signout`, {
    method: 'GET',
  }). then(response => {
    console.log('Signout success');
  }).catch(err => {
    console.log(err);
  })
};

export const setCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

export const removeCookie = (key) => {
  if (typeof window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== 'undefined') {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
};

export const rmeoveLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
};

export const authenticate = (data, next) => {
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  next()
};

export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCookie('token')
    const user = localStorage.getItem('user')
    if (cookieChecked && user) {
      return JSON.parse(user)
    } else {
      return false
    }
  }
};