import axios from 'axios';

export const createNewExpense = async (
  name: String,
  description: String,
  date: String,
  splitBy: String,
  creatorId: String
) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/expenses`,
      {
        name: name,
        description: description,
        date: date,
        split_by: splitBy,
        creator_id: creatorId,
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
