import { useContext } from "react";
import GoalsOutput from "../components/GoalsOutput";
import { GoalContext } from "../storage/goal-context";

function ViewGoals() {
  const goalsCtx = useContext(GoalContext);
  
  return <GoalsOutput goals={ goalsCtx.goals } />;
}

export default ViewGoals;
