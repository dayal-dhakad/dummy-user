import React, { useState } from 'react';
import { reactIcons } from '@/utils/icons';
import { isYupError, parseYupError } from '@/utils/Yup';
import toast from 'react-hot-toast';
import { validateForm, validateData } from '@/utils/validation';
import { postReq } from '@/utils/apiHandlers';
import { Navbar } from '../pageListAsync';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});

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
      const [, ValidationErr] = await validateData(validateForm, form);
      if (ValidationErr) {
        setFormError(ValidationErr);
        return;
      }

      const res = await postReq('/user/user-meta', form);
      const { status, error } = res;
      console.log(res);
      if (status) {
        setForm({
          businessName: '',
          address: '',
          city: '',
          state: '',
          pinCode: '',
          whatsappNumber: '',
          phoneNumber: '',
          gstNumber: '',
          yearOfEstablishment: '',
          rating: '',
          sourcesLink: '',
          sourcesPlatform: '',
          employeeId: '',
          employeeName: '',
          employeeMobileNumber: '',
        });
        toast.success('Details Submitted');
        setFormError({});
      } else if (error) {
        Array.isArray(error.message)
          ? error?.message.map((msg) => toast.error(msg))
          : toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container my-10 w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col md:grid grid-cols-2 md:gap-x-5">
            <div className="input-div w-full">
              <label className="input-label" htmlFor="businessName">
                Business Name
              </label>
              <input
                className="input-box"
                type="text"
                id="businessName"
                placeholder="Enter Business name "
                name="businessName"
                value={form?.businessName}
                onChange={handleChange}
              />
              <div className="error">
                {formError.businessName && (
                  <div className="form-eror">{formError.businessName}</div>
                )}
              </div>
            </div>

            <div className="input-div">
              <label className="input-label" htmlFor="address">
                Address
              </label>
              <input
                className="input-box"
                type="text"
                id="address"
                placeholder="Enter Address"
                name="address"
                onChange={handleChange}
                value={form?.address}
              />
              <div className="error">
                {formError.address && (
                  <div className="form-eror">{formError.address}</div>
                )}
              </div>
            </div>

            <div className="input-div">
              <label className="input-label" htmlFor="city">
                City
              </label>
              <input
                className="input-box"
                type="text"
                id="city"
                placeholder="Enter city"
                name="city"
                onChange={handleChange}
                value={form?.city}
              />
              <div className="error">
                {formError.city && (
                  <div className="form-eror">{formError.city}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="state">
                State
              </label>
              <input
                className="input-box"
                type="text"
                id="state"
                placeholder="Enter state"
                name="state"
                onChange={handleChange}
                value={form?.state}
              />
              <div className="error">
                {formError.state && (
                  <div className="form-eror">{formError.state}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="pinCode">
                Pin Code
              </label>
              <input
                className="input-box"
                type="text"
                id="pinCode"
                placeholder="Enter pincode"
                name="pinCode"
                onChange={handleChange}
                value={form?.pinCode}
              />
              <div className="error">
                {formError.pinCode && (
                  <div className="form-eror">{formError.pinCode}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="whatsappNumber">
                Whatsapp Number
              </label>
              <input
                className="input-box"
                type="text"
                id="whatsappNumber"
                placeholder="Enter whatsapp Number"
                name="whatsappNumber"
                onChange={handleChange}
                value={form?.whatsappNumber}
              />
              <div className="error">
                {formError.whatsappNumber && (
                  <div className="form-eror">{formError.whatsappNumber}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="input-box"
                type="text"
                id="phoneNumber"
                placeholder="Enter phone number"
                name="phoneNumber"
                onChange={handleChange}
                value={form?.phoneNumber}
              />
              <div className="error">
                {formError.phoneNumber && (
                  <div className="form-eror">{formError.phoneNumber}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="gstNumber">
                GST Number
              </label>
              <input
                className="input-box"
                type="text"
                id="gstNumber"
                placeholder="Enter gst number"
                name="gstNumber"
                onChange={handleChange}
                value={form?.gstNumber}
              />
              <div className="error">
                {formError.gstNumber && (
                  <div className="form-eror">{formError.gstNumber}</div>
                )}
              </div>
            </div>

            <div className="input-div">
              <label className="input-label" htmlFor="yearOfEstablishment">
                Year Of Establishment
              </label>
              <input
                className="input-box"
                type="text"
                id="yearOfEstablishment"
                placeholder="Enter year of establishment"
                name="yearOfEstablishment"
                onChange={handleChange}
                value={form?.yearOfEstablishment}
              />
              <div className="error">
                {formError.yearOfEstablishment && (
                  <div className="form-eror">
                    {formError.yearOfEstablishment}
                  </div>
                )}
              </div>
            </div>

            <div className="input-div">
              <label className="input-label" htmlFor="rating">
                Rating
              </label>
              <input
                className="input-box"
                type="text"
                id="rating"
                placeholder="Enter rating"
                name="rating"
                onChange={handleChange}
                value={form?.rating}
              />
              <div className="error">
                {formError.rating && (
                  <div className="form-eror">{formError.rating}</div>
                )}
              </div>
            </div>

            <div className="input-div">
              <label className="input-label" htmlFor="sourcesLink">
                Sources Link
              </label>
              <input
                className="input-box"
                type="text"
                id="sourcesLink"
                placeholder="Enter link"
                name="sourcesLink"
                onChange={handleChange}
                value={form?.sourcesLink}
              />
              <div className="error">
                {formError.sourcesLink && (
                  <div className="form-eror">{formError.sourcesLink}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="sourcesPlatform">
                Sources Platform
              </label>
              <input
                className="input-box"
                type="text"
                id="sourcesPlatform"
                placeholder="Enter Sources Platform"
                name="sourcesPlatform"
                onChange={handleChange}
                value={form?.sourcesPlatform}
              />
              <div className="error">
                {formError.sourcesPlatform && (
                  <div className="form-eror">{formError.sourcesPlatform}</div>
                )}
              </div>
            </div>
            <div className="input-div w-full">
              <label className="input-label" htmlFor="employeeId">
                Employee Id
              </label>
              <input
                className="input-box"
                type="text"
                id="employeeId"
                placeholder="Enter Employee Id "
                name="employeeId"
                onChange={handleChange}
                value={form?.employeeId}
              />
              <div className="error">
                {formError.employeeId && (
                  <div className="form-eror">{formError.employeeId}</div>
                )}
              </div>
            </div>
            <div className="input-div w-full">
              <label className="input-label" htmlFor="employeeName">
                Employee Name
              </label>
              <input
                className="input-box"
                type="text"
                id="employeeName"
                placeholder="Enter Employee Name "
                name="employeeName"
                onChange={handleChange}
                value={form?.employeeName}
              />
              <div className="error">
                {formError.employeeName && (
                  <div className="form-eror">{formError.employeeName}</div>
                )}
              </div>
            </div>
            <div className="input-div w-full">
              <label className="input-label" htmlFor="employeeMobileNumber">
                Employee Mobile Number
              </label>
              <input
                className="input-box"
                type="text"
                id="employeeMobileNumber"
                placeholder="Enter Employee Mobile Number "
                name="employeeMobileNumber"
                onChange={handleChange}
                value={form?.employeeMobileNumber}
              />
              <div className="error">
                {formError.employeeMobileNumber && (
                  <div className="form-eror">
                    {formError.employeeMobileNumber}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-7">
            <button
              type="submit"
              // onClick={handleSubmit}
              className={`text-white font-medium py-2  px-10 rounded-md text-14 bg-primary-1200 font-comfortaa  flex items-center gap-3 ${
                isLoading && 'opacity-50'
              }`}
              disabled={isLoading}
            >
              Submit{' '}
              {isLoading && (
                <span className="animate-spin text-20">
                  {reactIcons.spinLoader}
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
