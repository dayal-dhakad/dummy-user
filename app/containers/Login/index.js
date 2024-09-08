import { postReq, setAuthCookie } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { signInValidationSchema, validateData } from '@/utils/validation';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isYupError, parseYupError } from '@/utils/Yup';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ type: 'user' });
  const [formError, setFormError] = useState({});
  const [setLock, isSetLock] = useState();
  const navigate = useNavigate();
  const lockFunction = () => {
    isSetLock(!setLock);
  };

  // Login API Calling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({ ...formError, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const [, ValidationErr] = await validateData(
        signInValidationSchema,
        form,
      );
      if (ValidationErr) {
        setFormError(ValidationErr);
        return;
      }

      const res = await postReq('/auth/login', form);
      const { status, error, data } = res;
      console.log(res);
      if (status) {
        setAuthCookie(data?.token);
        toast.success('Logged in');
        navigate('/');
      } else if (error) {
        toast.error(error);
        // Array.isArray(error.message)
        //   ? error?.message.map((msg) => toast.error(msg))
        //   : toast.error(error.message);
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log(form, 'form data');
  return (
    <main className=" relative h-screen flex items-center lg:justify-center flex-col text-black overflow-hidden">
      <div className="hidden lg:block absolute z-10 top-7 left-7  w-[200px]">
        <img
          className="h-full w-full object-cover"
          src="/images/vistaImg.png"
          alt="logo"
        />
      </div>
      <div className=" flex  justify-center lg:hidden my-5  w-[200px]">
        <img
          className="h-full w-full object-cover"
          src="/images/vistaImg.png"
          alt="logo"
        />
      </div>

      <section className="container ">
        <form>
          <div className="bg-primary-300/[.19] mx-auto backdrop-blur-[5.5px] max-w-[535px] w-full py-5 px-4 md:px-7 rounded-10 mt-5 lg:mt-0">
            <h2 className="font-comfortaa text-32">Login</h2>
            <div className="py-12 space-y-5">
              <div className="space-y-2">
                <label htmlFor="id">Your ID</label>
                <input
                  className=" !px-6"
                  type="text"
                  id="id"
                  placeholder="Enter your ID"
                  name="id"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.id && (
                    <div className="form-eror">{formError.id}</div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="Password">Password</label>
                <div className="relative">
                  <input
                    className=" !px-6"
                    type={setLock ? 'text' : 'password'}
                    id="Password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                  />
                  <span
                    onClick={lockFunction}
                    className="cursor-pointer absolute top-3 z-10 right-6 text-26 text-primary-600"
                  >
                    {setLock ? reactIcons.eye : reactIcons.eyesplash}
                  </span>
                  <div className="error">
                    {formError.password && (
                      <div className="form-eror">{formError.password}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className={`bg-gradient btn w-full ${isLoading && 'opacity-50'}`}
              disabled={isLoading}
            >
              Login{' '}
              {isLoading && (
                <span className="animate-spin text-20">
                  {reactIcons.spinLoader}
                </span>
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
