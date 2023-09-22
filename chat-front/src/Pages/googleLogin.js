import { useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import axios from "axios";
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";

function GoogleSignIn(props) {
  const navigate = useNavigate();
  const clientID =
    "627415390447-9glplqmq1o1kv1l1b6bvql3gplm92k90.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);

    // eslint-disable-next-line
  }, []);

  const onSuccess = (response) => {
    console.log(response.tokenId);

    const id_token = response.tokenId;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${id_token}`, // Utiliza el token de Google directamente
    };

    // Datos que deseas enviar en el cuerpo de la solicitud (si es necesario)
    const requestBody = {
      id_token,
    };

    // Realizar la solicitud POST con Axios
    axios
      .post("http://localhost:8080/user/google", requestBody, {
        headers: headers,
      })
      .then((response) => {
        // Manejar la respuesta del servidor si es necesario
        console.log("Respuesta del servidor:", response.data);
        makeToast("success", response.data.msg);
        localStorage.setItem("G_Token", response.data.token);

        navigate("/chatroom");
        props.setupSocket('G_Token');
      })
      .catch((err) => {
        if (err && err.response && err.response.data && err.response.data.msg){
            makeToast("error", err.response.data.msg);
        }
      });
  };

  const onFailure = () => {
    console.log("Algo va mal");
  };

  return (
    <div className="center">
      <h1>Login</h1>

      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue  with Google"
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default GoogleSignIn;
