import axios from 'axios'
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY_TIDB
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY_TIDB
const url = 'https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-EEbKQFyV/endpoint/location_preview';

export default async function getPreview(cid_array) {
  try {
    const response = await axios.post(url, {
      "cid_array": cid_array.join(",")
    }, {
      auth: {
        username: PUBLIC_KEY,
        password: PRIVATE_KEY
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response.data.data.rows
  } catch (error) {
    console.error('Error:', error);
  }
};

