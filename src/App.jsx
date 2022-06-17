import FormikForm from "./containers/forms/FormikForm";
import { Image } from "react-native";
import "./styles.scss";

export default function App() {
  return (
    <div className="App">
      <div className="box-logo">
        <Image
          source={
            "https://egerie-software.com/wp-content/themes/egerie/img/egerie-logo.svg"
          }
        />
      </div>
      <FormikForm />
    </div>
  );
}
