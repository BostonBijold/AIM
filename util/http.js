import axios from "axios";

const BACKEND_URL =
  "https://agile-life-development-default-rtdb.firebaseio.com";

export async function storeGoal(goalData) {
  const response = await axios.post(BACKEND_URL + "/goals.json", goalData);
  const id = response.data.name;
  return id;
}

export async function fetchGoals() {
  const response = await axios.get(BACKEND_URL + "/goals.json");

  const goals = [];

  for (const key in response.data) {
    const goalObj = {
      id: key,
      title: response.data[key].title,
      willDescription: response.data[key].willDescription,
      whyDescription: response.data[key].whyDescription,
      deadline: new Date(response.data[key].deadline),
      isComplete: response.data[key].isComplete,
      //createdAt: new Date("2023-01-07"),
      completedTasks: response.data[key].completedTasks,
      totalTasks: response.data[key].totalTasks,
    };
    goals.push(goalObj);
  }
  return goals;
}

export function updateGoal(id, goalData) {
  return axios.put(BACKEND_URL + `/goals/${id}.json`, goalData);
}

export function deleteGoal(id) {
  return axios.delete(BACKEND_URL + `/goals/${id}.json`);
}

export async function storeTask(taskData) {
  const response = await axios.post(BACKEND_URL + "/tasks.json", taskData);
  const id = response.data.name;
  return id;
}

export async function fetchTasks() {
  
  const response = await axios.get(BACKEND_URL + "/tasks.json");
  
  const tasks = [];
  
  for (const key in response.data) {
    const taksObj = {
      id: key,
      description: response.data[key].description,
      goalId: response.data[key].goalId,
      isComplete: response.data[key].isComplete,
      goalTitle: response.data[key].goalTitle,
    };
    tasks.push(taksObj);
  }
  return tasks;
}

export function updateTask(id, taskData) {
  return axios.put(BACKEND_URL + `/tasks/${id}.json`, taskData);
}

export function removeTask(id) {
  return axios.delete(BACKEND_URL + `/tasks/${id}.json`);
}


export async function storeFocus(focusData) {
  //console.log(focusData)
  const response = await axios.post(BACKEND_URL + "/focus.json", focusData);
  const id = response.data.name;
  return id;
}

export async function updateFocus(id, focusData) {
  return axios.put(BACKEND_URL + `/focus/${id}.json`, focusData);
}

export async function fetchFocus() {
  // fetchFocus fetches all focus. Update to only get the current? All will be used in the calendar. 
  const response = await axios.get(BACKEND_URL + "/focus.json");

  const focus = [];

  for (const key in response.data) {
    const focusObj = {
      id: key,
      journal: response.data[key].journal,
      focusDate: new Date(response.data[key].focusDate),

    };
    focus.push(focusObj);
  }
  return focus;
}