import axios from 'axios';

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
};
