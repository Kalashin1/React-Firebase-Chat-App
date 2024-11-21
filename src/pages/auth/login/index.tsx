import { Link, useNavigate } from "react-router-dom";
import { SCREENS } from "../../../navigation/constants";
import { useRef, FormEvent, useState } from "react";
import { Login } from "../../../helper";
import {
  NotificationComponent,
  notify,
} from "../../dashboard/components/notification";

const LoginPage = () => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasError(false);
    const {
      email: { value: email },
      password: { value: password },
    } = formRef.current!;
    const [error, user] = await Login(email, password, false);
    setIsLoading(false);
    if (error) {
      notify(<NotificationComponent message="error logging in" />, {
        autoClose: false,
        style: { background: "red", color: "white" },
      });
      if (error.message.includes("auth/invalid-credential")) {
        setHasError(true);
      }
    }
    if (user) navigate(SCREENS.HOME);
  };
  return (
    <div className="min-h-screen flex grow bg-slate-50 dark:bg-navy-900">
      <main className="grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                Welcome Back
              </h2>
              <p className="text-slate-400 dark:text-navy-300">
                Please sign in to continue
              </p>
            </div>
          </div>
          <div className="shadow-md bg-white mt-5 rounded-lg p-5 lg:p-7">
            <form ref={formRef} onSubmit={handleSubmit}>
              <label className="block">
                <span>Email:</span>
                <span className="relative mt-1.5 flex">
                  <input
                    className={`form-input peer w-full rounded-lg border ${
                      hasError
                        ? "border-red-500"
                        : "border-slate-300 hover:border-slate-400 "
                    }  bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 focus:z-10`}
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                  />
                  <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </span>
                </span>
              </label>
              <label className="mt-4 block">
                <span>Password:</span>
                <span className="relative mt-1.5 flex">
                  <input
                    className={`form-input peer w-full rounded-lg border ${
                      hasError
                        ? "border-red-500"
                        : "border-slate-300 hover:border-slate-400 "
                    }  bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 focus:z-10`}
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                  />
                  <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </span>
                </span>
              </label>
              <div className="mt-4 flex items-center justify-between space-x-2">
                <label className="inline-flex items-center space-x-2">
                  <input
                    className="form-checkbox is-basic h-5 w-5 rounded border-slate-400/70 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:checked:border-accent dark:checked:bg-accent dark:hover:border-accent dark:focus:border-accent"
                    type="checkbox"
                  />
                  <span className="line-clamp-1">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-xs text-slate-400 transition-colors line-clamp-1 hover:text-slate-800 focus:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100 dark:focus:text-navy-100"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="py-2 rounded-md shadow-md mt-5 w-full bg-blue-400 font-medium text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-950 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                {isLoading ? (
                  <span className="w-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={20}
                      className="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M12 2.99988V5.99988M12 20.9999V17.9999M4.20577 16.4999L6.80385 14.9999M21 11.9999H18M16.5 19.7941L15 17.196M3 11.9999H6M7.5 4.20565L9 6.80373M7.5 19.7941L9 17.196M19.7942 16.4999L17.1962 14.9999M4.20577 7.49988L6.80385 8.99988"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p>Loading</p>
                  </span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
            <div className="mt-4 text-center text-xs+">
              <p className="line-clamp-1">
                <span>Dont have Account? </span>

                <Link
                  to={SCREENS.REGISTER}
                  className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
