import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const isDevelopment = process.env.NODE_ENV !== 'production';
const isProductionApp = process.env.APP_ENV === 'production';

export const setAuthCookie = (token) => {
  setTimeout(() => {
    removeAuthCookie();
    window.location.reload();
  }, 86400000);
  Cookies.set('token', token);
  return Cookies.set(
    isDevelopment
      ? 'test__user__isLoggedIn'
      : isProductionApp
      ? '__user__isLoggedIn'
      : `${isProductionApp}__user__isLoggedIn`,
    'true',
    { expires: 1 },
  );
};

export const removeAuthCookie = () => {
  Cookies.remove('token');
  return Cookies.remove(
    isDevelopment
      ? 'test__user__isLoggedIn'
      : isProductionApp
      ? '__user__isLoggedIn'
      : `${isProductionApp}__user__isLoggedIn`,
  );
};

export const isLoggedIn = () => {
  return (
    Boolean(
      Cookies.get(
        isDevelopment
          ? 'test__user__isLoggedIn'
          : isProductionApp
          ? '__user__isLoggedIn'
          : `${isProductionApp}__user__isLoggedIn`,
      ),
    ) && Boolean(Cookies.get('token'))
  );
};

export const showErrorMessage = (message) => {
  if (message instanceof Array) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};

export const getUserToken = () => {
  return `Bearer ${Cookies.get('token')}`;
};

const responseFormatter = (status, data, error) => {
  return { status, data: data || null, error };
};

const handleApiError = (err) => {
  return responseFormatter(false, null, err?.response?.data?.message);
};

export const postReq = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;
  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };
  return await axios
    .post(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const patchReq = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;

  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };

  return await axios
    .patch(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const getReq = async (endpoint) => {
  const url = process.env.API_URL + endpoint;

  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };

  return await axios
    .get(url, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const deleteReq = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;

  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };

  try {
    const response = await axios.delete(url, {
      data,
      withCredentials: true,
      headers,
    });
    return responseFormatter(true, response.data, null);
  } catch (err) {
    return handleApiError(err);
  }
};

export const postFile = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;
  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(url, data, {
      withCredentials: true,
      headers,
    });
    return responseFormatter(true, response.data, null);
  } catch (err) {
    console.log(err);
    return handleApiError(err);
  }
};
