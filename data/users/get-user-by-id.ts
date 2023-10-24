import axios from 'axios';

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/${id}`
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
