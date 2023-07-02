import PropTypes from 'prop-types'

export function LoginForm({ onSubmit, onEmailChange, onPasswordChange, email, password }) {
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
            <button
                type="submit"
                className="bg-blue-pixel px-6 py-2 mt-6 text-sm rounded-md font-oxanium-semibold text-white"
            >
                Login
            </button>
        </form>
    );
}

LoginForm.propTypes = {
    onSubmit : PropTypes.func,
    onEmailChange : PropTypes.func,
    onPasswordChange : PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
 }