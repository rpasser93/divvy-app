import axios from 'axios';

export const attemptLogin = async (username: String, password: String) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/login`,
      {
        username: username,
        password: password,
      }
    );

    const successObject = {
      success: true,
      data: response.data,
    };
    return successObject;
  } catch (error) {
    console.log(error.response.data);

    const failureObject = {
      success: false,
      data: error.response.data,
    };
    return failureObject;
  }
};
