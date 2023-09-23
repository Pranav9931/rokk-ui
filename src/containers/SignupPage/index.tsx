import { useAuth0 } from "@auth0/auth0-react";
import { ImageContainer } from "./ImageContainer";
// import { InputContainer } from "./SignupDetails";
import EmailContainer from "./EmailContainer";

export default () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <ImageContainer />
      <EmailContainer />
      {/* <InputContainer /> */}
    </div>
  );
};
