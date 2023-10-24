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
    return response.data['_id']['$oid'].toString();
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
};
