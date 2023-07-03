import PropTypes from 'prop-types'

export function FormRegister({ onSubmit, onEmailChange, onPasswordChange, onConfPasswordChange, email, password, confPassword }) {
    return (
      <form className="-mt-10" onSubmit={onSubmit}>
        <div className="flex flex-col mt-6">
          <label htmlFor="email" className="font-oxanium-semibold text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-black rounded-md p-2 mt-1"
            value={email}
            onChange={onEmailChange}
            required
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password" className="font-oxanium-semibold text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-black rounded-md p-2 mt-1"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="confPassword" className="font-oxanium-semibold text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confPassword"
            className="border border-black rounded-md p-2 mt-1"
            value={confPassword}
            onChange={onConfPasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-pixel px-6 py-2 mt-6 text-sm rounded-md font-oxanium-semibold text-white"
        >
          Register
        </button>
      </form>
    );
  }
  
  FormRegister.propTypes = {
    onSubmit: PropTypes.func,
    onEmailChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onConfPasswordChange: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    confPassword: PropTypes.string,
  }