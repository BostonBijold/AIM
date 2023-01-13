import { useContext } from "react";
import GoalsOutput from "../components/GoalsOutput";
import { GoalContext } from "../storage/goal-context";

function ViewGoals() {
  const goalsCtx = useContext(GoalContext);

    const activeGoals = goalsCtx.goals.filter((goal) => {
    return goal.isComplete === false;
  });
  return <GoalsOutput goals={ activeGoals } />;
  
}

export default ViewGoals;
