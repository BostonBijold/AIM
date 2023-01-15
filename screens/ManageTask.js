import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskForm from '../components/ManageEntries/TaskForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/colors';
import { TaskContext } from '../storage/Task-Context';


function ManageTask({ route, navigation }) {
   const taskCtx = useContext(TaskContext);
   const editedTaskId = route.params?.taskId;
   const isEditing = !!editedTaskId;

   const selectedTask = taskCtx.tasks.find(task => task.id === editedTaskId)

   useLayoutEffect(() => {
      navigation.setOptions({
         title: isEditing ? 'Edit Task' : 'Add Task',
      });
   }, [navigation, isEditing]); 

   function cancelHandler() {
      navigation.goBack();
   }

   function confirmHandler(taskData) {
      if (isEditing) {
      console.log(taskData);
      taskCtx.updateTask(editedTaskId, taskData);
      } else {
         console.log(taskData); 
         taskCtx.addTask(taskData);
      }
      navigation.goBack();
   }

   return (
      <View style={styles.container}>
      {isEditing && (
        <View style={styles.completeCancel}>
          <IconButton
            icon={"trash"}
            size={50}
            color={GlobalStyles.colors.dark1}
            onPress={cancelHandler}
          />
          <IconButton
            icon={"checkbox"}
            size={50}
            color={GlobalStyles.colors.dark1}
            onPress={cancelHandler}
          />
        </View>
        
      )}
      <TaskForm onCancel={cancelHandler}
      onSubmit={confirmHandler}
      submitButtonLable={isEditing ? 'Update' : 'Add'}
      defaultValues={selectedTask}
      />
  </View>   );
}

export default ManageTask;

//set the page title as 'add task' or task title. 
const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20
   },
 
   completeCancel: {
     flexDirection: "row",
     justifyContent: 'space-between'
   },
   buttonContainer: {
     borderColor: GlobalStyles.colors.layer1,
     borderRadius: 8,
     borderWidth: 2,
     backgroundColor: GlobalStyles.colors.layer1light,
     width: 200,
     justifyContent: "center",
     alignItems: "center",
     margin: 8,
   },
   inputContainer: {
     borderWidth: 2,
     borderRadius: 8,
   },
 });
 
 
 //set the title of the goal as the title on the card or 'add goal'.
 // trash and complete goal icons need to be at the top of the form .
 
 
 