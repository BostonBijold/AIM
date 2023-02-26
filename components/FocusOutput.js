import { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import TasksOutput from "./TasksOutput";
import { fetchFocus, fetchTasks, storeFocus } from "../util/http";
import { TaskContext } from "../storage/Task-Context";
import IconButton from "./UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import Button from "./UI/Button";
import FocusTaskList from "../storage/FocusTasksList";
import TaskList from "../storage/TaskList";
import { useNavigation } from "@react-navigation/native";

const DUMMY = [
  {
    id: 123,
    focusDate: new Date('2023-01-01') , 
    journal: 'journal string stored.', 
    //task list,
    tasksCompleted: false
  }, 
  {
    id: 124,
    focusDate: new Date('2023-02-04') , 
    journal: 'journal string stored 2.', 
    //task list,
    tasksCompleted: false
  }, 
]


function FocusOutput({defaultValues, focusId}) {
  // console.log(focusId)
  const navigation = useNavigation();
  const [error, setError] = useState();
  const taskCtx = useContext(TaskContext);
  const [input, setInput] = useState({
    
    // calendar http get history
    
    journal: {
      value: defaultValues ? defaultValues.journal : ''
      //tasks completed? t/f 
    },
    focusTasks: {
      value: defaultValues ? defaultValues.focusTasks: []
    }
  });
  const [focusT, setFocusT] = useState(input.focusTasks);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInput((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue }, //standard JS to dynamicaly select a value to update.
        // the identifier selects the object key to update.
      };
    });
  }

  useEffect(() => {
    async function getTasks() {
      // setIsFetching(true);
      try {
        const taskLoad = await fetchTasks();
        taskCtx.setTasks(taskLoad);
      } catch (error) {
        setError("Could not fetch goals.");
      }
      // setIsFetching(false);
    }
    async function getFocus() {
      try {
        const focusLoad = await fetchFocus();
      } catch (error) {
        setError("Could not fetch Focus");
      }
    }

    getTasks();
    getFocus();
  }, []);
  
  function addTaskToFocus(task) {
    input.focusTasks.push(task);
  }

  async function submitHandler() {
    // used when text is saved, and when tasks are added.
    const focusData = {
      journal: input.journal,
      focusDate: new Date(),
      // numberOfTasks: numberOfTasks
      focusTasks: [], // use focus ID for Task Refence and load tasks when viewing history or current focus.
    };
    try {
      //const id = await storeFocus(focusData);
    } catch {
      console.log("error");
    }
    navigation.navigate("Focus"); 
    //returns the user to the focus screen outside of a modal.

  }

  const nonFocusTasks = taskCtx.tasks.filter(
    (task) => defaultValues.focusTasks.some((id) => id === task.id)
    );
    // magically worked...... ^

console.log(defaultValues.focusTasks)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text>Journal</Text>
          {/* fix to be centered in the calendar */}
          <IconButton
            icon={"calendar"}
            size={30}
            color={GlobalStyles.colors.dark1}
            style={styles.buttonContainer}
            // onPress={AddItem}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            multiline={true}
            onChangeText={inputChangedHandler.bind(this, "journal")}
            // returnKeyType='done' // changes the name of the enter key
            value={input.journal.value}
          />
          <View style={styles.heading}>
            {/* make this visable if text is changed?  */}
            <Button>cancel</Button>
            <Button onPress={submitHandler}>save</Button>
          </View>
        </View>
        {/* <TaskList tasks={nonFocusTasks} focusId={focusId} extraData={defaultValues.focusData}/> */}
        <TasksOutput tasks={nonFocusTasks} focusId={focusT}  />
        {/* <FocusTaskList tasks={input.focusTasks.value} focusId={focusId}  /> */}
        {/* pass a value to have add open select task modal.  */}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default FocusOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  input: {
    borderColor: GlobalStyles.colors.dark1,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.white,
    height: 200,
  },
});
