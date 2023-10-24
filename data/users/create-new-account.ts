import axios from 'axios';

export const createNewAccount = async (username: String, password: String) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/users`,
      {
        username: username,
        password: password,
      }
    );

    const successObject: object = {
      success: true,
      data: response.data,
    };
    return successObject;
  } catch (error) {
    console.log(error.response.data);

    const failureObject: object = {
      success: false,
      errorMessage: error.response.data,
    };
    return failureObject;
  }
};
