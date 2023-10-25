import axios from 'axios';

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/${id}`
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
