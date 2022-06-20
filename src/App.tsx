import FormikForm from "./containers/forms/FormikForm";
import "./styles.scss";

export default function App() {
  return (
    <div className="App">
      <div className="box-logo">
        <img
          src="https://egerie-software.com/wp-content/themes/egerie/img/egerie-logo.svg"
          alt="img-egerie"
        />
      </div>
      <FormikForm />
    </div>
  );
}
