import { useDispatch } from "react-redux";
import { loginRequest } from "../store/ducks/currentUser/currentUser.middleware";
import { getUsersRequest } from "../store/ducks/users/users.middleware";
import { AppDispatch } from "../store/store";

function App() {
  // const dispatch = useDispatch<AppDispatch>();

  // const getUsers = () => {
  //   dispatch(getUsersRequest());
  // };

  // const login = () => {
  //   dispatch(loginRequest({ email: "a", password: "a" }));
  // };

  return (
    <div>
      {/* <button onClick={login}>login</button>
      <button onClick={getUsers}>get users</button> */}
    </div>
  );
}

export default App;
