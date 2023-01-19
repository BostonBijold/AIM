import axios from "axios";

const BACKEND_URL = 'https://agile-life-development-default-rtdb.firebaseio.com'

export async function storeGoal(goalData) {
  const response = await axios.post( BACKEND_URL +'/goals.json',
  goalData
  );
    const id = response.data.name;
    return id;
}

export async function fetchGoals() {
    const response = await axios.get(BACKEND_URL +'/goals.json');

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
            totalTasks: response.data[key].totalTasks
        }
        goals.push(goalObj);
    }
    return goals;
}

export function updateGoal(id, goalData) {
    return axios.put(BACKEND_URL + `/goals/${id}.json`, goalData);
}

export function deleteGoal(id) {
    return axios.delete(BACKEND_URL + `/goals/${id}.json`)
}