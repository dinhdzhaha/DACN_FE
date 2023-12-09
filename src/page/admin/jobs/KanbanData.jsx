import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
async function getData(){
  try {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const baseURL = import.meta.env.VITE_API_URL;
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + userAuth?.token
      }
    };

    const response = await axios.get(baseURL + `api/Task/GetTasks`, yourConfig);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
export const data = await getData();

export const columnsFromBackend = {
  [uuidv4()]: {
    title: 'Chưa thực hiện',
    items: data.filter(column => column.status === "todo"),
  },
  [uuidv4()]: {
    title: 'Đang thực hiện',
    items: data.filter(column => column.status === "doing"),
  },
  [uuidv4()]: {
    title: 'Đã xong',
    items: data.filter(column => column.status === "done"),
  },
  [uuidv4()]: {
    title: 'Đã nhận',
    items: data.filter(column => column.status === "complete"),
  },
};
