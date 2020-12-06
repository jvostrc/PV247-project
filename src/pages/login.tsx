import { FC } from "react";
import { googleLogin } from "../utils/firebase";

const Login: FC = () => {
  return (
        <button onClick={googleLogin}>
        <span> Continue with Google</span>
       </button>
  );
};

export default Login