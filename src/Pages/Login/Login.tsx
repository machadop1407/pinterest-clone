import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CreateUserMutation } from "../../GraphQL/Mutations";

//Style
import "./Login.css";

const Login: React.FC = () => {
  //Apollo Hooks
  const [createUser, { error }] = useMutation(CreateUserMutation);

  const responseGoogle = async (response: any) => {
    var user = await response.profileObj;

    sessionStorage.setItem("imageUrl", user.imageUrl);
    sessionStorage.setItem("googleId", user.googleId);
    sessionStorage.setItem("loggedIn", "true");

    if (error) {
      console.log(error.message);
    } else {
      await createUser({
        variables: {
          firstName: user.givenName,
          lastName: user.familyName ? user.familyName: user.givenName,
          email: user.email,
          googleId: user.googleId,
        },
      });
    }
    window.location.pathname = "/";
  };

  return (
    <div className="LoginContainer">
      <div className="Login">
        <div className="loginHeader">
          <h1> Login </h1>
        </div>

        <div className="loginBody">
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID as string}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="googleLogin"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
