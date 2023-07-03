import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
import { FormRegister } from "../components/FormRegister";
import { UserContext } from "../App";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ErrorMessage({ error }) {
  return (
    <div className="absolute w-full flex -m-3 justify-center -top-16">
      <span className="tracking-wider px-2 h-12 rounded-lg bg-red-pixel grid place-content-center -z-10 font-oxanium text-white">
        {error}
      </span>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string
}

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfPasswordChange = (event) => {
    setConfPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password,
        confPassword,
      }, { withCredentials: true });
      navigate('/')
      setError(null);
      if (response.data && !user.loggedIn) {
        setUser({ loggedIn: true });
        console.log(user);
        if (location?.state?.from) {
          navigate(location.state.from);
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan. Mohon coba lagi.');
      }
    }
  };

  return (
    <div className="w-screen mt-36 flex justify-center">
      <div className="h-[400px] flex flex-col justify-between w-80 border-2 p-3 border-black rounded-lg relative bg-white">
        <div className="absolute w-full h-full -bottom-3 rounded-lg -right-3 bg-black -z-10"></div>
        {error && <ErrorMessage error={error} />}
        <h3 className="font-oxanium-semibold text-2xl bg-green-pixel h-fit w-fit -m-3 p-3 rounded-br-lg">
          Register
        </h3>
        <FormRegister
          onSubmit={handleSubmit}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onConfPasswordChange={handleConfPasswordChange}
          email={email}
          password={password}
          confPassword={confPassword}
        />
        <div className="flex gap-2 items-center">
          <h6 className="font-oxanium text-sm">Belum mendaftar?</h6>
          <Link to="/register" className="text-sm font-oxanium-semibold px-4 py-1 text-white rounded-md bg-yellow-pixel">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}