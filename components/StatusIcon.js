import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/colors";

function StatusIcon(status) {
  if (status) {
    return <Ionicons name={"checkbox"} color={GlobalStyles.colors.dark1} />;
  } else {
    return (
      <Ionicons name={"checkbox"} color={GlobalStyles.colors.dark1} size={24} />
    );
  }
}

export default StatusIcon;

const styles = StyleSheet.create({
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 50,
    width: 50,
  },
});
