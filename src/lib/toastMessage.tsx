import { AlertCircleIcon, CheckIcon } from "lucide-react-native";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

// Configure Toast
export const toastConfig: ToastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderColor: "green",
        borderWidth: 2,
        borderLeftWidth: 2,
        borderLeftColor: "green",
        marginTop: 24,
        borderRadius: 0,
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 16,
        fontFamily: "Lora_500Medium",
        color: "green",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Lora_400Regular",
        color: "black",
      }}
      renderTrailingIcon={() => <CheckIcon size={24} color="green" />}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderColor: "red",
        borderWidth: 2,
        borderLeftWidth: 2,
        borderLeftColor: "red",
        marginTop: 24,
        borderRadius: 0,
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 16,
        fontFamily: "Lora_500Medium",
        color: "red",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Lora_400Regular",
        color: "black",
      }}
      renderTrailingIcon={() => <AlertCircleIcon size={24} color="red" />}
    />
  ),
};
