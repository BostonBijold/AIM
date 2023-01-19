import { useContext, useEffect, useState } from "react";
import GoalsOutput from "../components/GoalsOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GoalContext } from "../storage/goal-context";
import { fetchGoals } from "../util/http";

function ViewGoals() {
  const [isfetching, setIsFetching] = useState(true); // set to true since inital page load will always need to load data.
  const goalsCtx = useContext(GoalContext);
  const [error, setError] = useState();
  //const [fetchedGoals, setFetchedGoals] = useState([]);

  //async returns a JS 'promise' by force
  useEffect(() => {
    async function getGoals() {
      setIsFetching(true);
      try {
        const goals = await fetchGoals();
        goalsCtx.setGoals(goals);
      } catch (error) {
        setError('Could not fetch goals.')
      }
      setIsFetching(false);
    }
    getGoals();
  }, []);

  function errorHandler() {
    setError(null);
// attempt to reload data upon confirm being pressed. 
  }

  if (error && !isfetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/> 
  }

  if (isfetching) {
    return <LoadingOverlay />;
  }


  const activeGoals = goalsCtx.goals.filter((goal) => {
    //const activeGoals = fetchedGoals.filter((goal) => {

    return goal.isComplete === false;
  });
  return <GoalsOutput goals={activeGoals} />;
}

export default ViewGoals;
