import { useContext } from "react";
import GoalsOutput from "../components/GoalsOutput";
import { GoalContext } from "../storage/goal-context";

function CompletedGoals() {
  const goalsCtx = useContext(GoalContext);

  const completedGoals = goalsCtx.goals.filter((goal) => {
    return goal.isComplete === true;
  });

  return <GoalsOutput goals={completedGoals} />;
}

export default CompletedGoals;
