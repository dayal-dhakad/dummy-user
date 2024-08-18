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

      console.log(form);
      const res = await postReq('/user/user-meta', form);
      const { status, error, data } = res;

      if (status) {
        toast.success(data.message);
        setForm({});
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
        <form className="w-full">
          <div className="flex flex-col md:grid grid-cols-2 md:gap-x-5">
            <div className="input-div w-full">
              <label className="input-label" htmlFor="firstName">
                First Name
              </label>
              <input
                className="input-box"
                type="text"
                id="firstName"
                placeholder="Enter your first name "
                name="firstName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.firstName && (
                  <div className="form-eror">{formError.firstName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="lastName">
                Last name
              </label>
              <input
                className="input-box"
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                name="lastName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.lastName && (
                  <div className="form-eror">{formError.lastName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="fatherName">
                Father&apos;s name
              </label>
              <input
                className="input-box"
                type="text"
                id="fatherName"
                placeholder="Enter your Father's name"
                name="fatherName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.fatherName && (
                  <div className="form-eror">{formError.fatherName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="currentAddress">
                Current Address
              </label>
              <input
                className="input-box"
                type="text"
                id="currentAddress"
                placeholder="Enter your Current Address"
                name="currentAddress"
                onChange={handleChange}
              />
              <div className="error">
                {formError.currentAddress && (
                  <div className="form-eror">{formError.currentAddress}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="permanentAddress">
                Permanent Address
              </label>
              <input
                className="input-box"
                type="text"
                id="permanentAddress"
                placeholder="Enter your Permanent Address"
                name="permanentAddress"
                onChange={handleChange}
              />
              <div className="error">
                {formError.permanentAddress && (
                  <div className="form-eror">{formError.permanentAddress}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                className="input-box"
                type="text"
                id="contactNumber"
                placeholder="Enter your Contact Number"
                name="contactNumber"
                onChange={handleChange}
              />
              <div className="error">
                {formError.contactNumber && (
                  <div className="form-eror">{formError.contactNumber}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="alternateNumber">
                Alternate Number
              </label>
              <input
                className="input-box"
                type="text"
                id="alternateNumber"
                placeholder="Enter your Alternate Number"
                name="alternateNumber"
                onChange={handleChange}
              />
              <div className="error">
                {formError.alternateNumber && (
                  <div className="form-eror">{formError.alternateNumber}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="emergencyNumber">
                Emergency Number
              </label>
              <input
                className="input-box"
                type="text"
                id="emergencyNumber"
                placeholder="Enter your Emergency Number"
                name="emergencyNumber"
                onChange={handleChange}
              />
              <div className="error">
                {formError.emergencyNumber && (
                  <div className="form-eror">{formError.emergencyNumber}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="emailId">
                Email
              </label>
              <input
                className="input-box"
                type="text"
                id="emailId"
                placeholder="Enter your Email"
                name="emailId"
                onChange={handleChange}
              />
              <div className="error">
                {formError.emailId && (
                  <div className="form-eror">{formError.emailId}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="relativeName">
                Relative Name
              </label>
              <input
                className="input-box"
                type="text"
                id="relativeName"
                placeholder="Enter your Relative Name"
                name="relativeName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.relativeName && (
                  <div className="form-eror">{formError.relativeName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="relativeRelation">
                Relative Relation
              </label>
              <input
                className="input-box"
                type="text"
                id="relativeRelation"
                placeholder="Enter your Relative Relation"
                name="relativeRelation"
                onChange={handleChange}
              />
              <div className="error">
                {formError.relativeRelation && (
                  <div className="form-eror">{formError.relativeRelation}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="relativeNumber">
                Relative Number
              </label>
              <input
                className="input-box"
                type="text"
                id="relativeNumber"
                placeholder="Enter your Relative Number"
                name="relativeNumber"
                onChange={handleChange}
              />
              <div className="error">
                {formError.relativeNumber && (
                  <div className="form-eror">{formError.relativeNumber}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label
                className="input-label"
                htmlFor="currentWorkingCompanyName"
              >
                Current Working Company Name
              </label>
              <input
                className="input-box"
                type="text"
                id="currentWorkingCompanyName"
                placeholder="Enter your Current Working"
                name="currentWorkingCompanyName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.currentWorkingCompanyName && (
                  <div className="form-eror">
                    {formError.currentWorkingCompanyName}
                  </div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="companyName">
                Company Name
              </label>
              <input
                className="input-box"
                type="text"
                id="companyName"
                placeholder="Enter your Company Name"
                name="companyName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.companyName && (
                  <div className="form-eror">{formError.companyName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="companyAddress">
                Company Address
              </label>
              <input
                className="input-box"
                type="text"
                id="companyAddress"
                placeholder="Enter your Company Address"
                name="companyAddress"
                onChange={handleChange}
              />
              <div className="error">
                {formError.companyAddress && (
                  <div className="form-eror">{formError.companyAddress}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="companyContactNumber">
                Company Contact Number
              </label>
              <input
                className="input-box"
                type="text"
                id="companyContactNumber"
                placeholder="Enter your Company Address"
                name="companyContactNumber"
                onChange={handleChange}
              />
              <div className="error">
                {formError.companyContactNumber && (
                  <div className="form-eror">
                    {formError.companyContactNumber}
                  </div>
                )}
              </div>
            </div>

            <div className="input-div">
              <label className="input-label" htmlFor="contactPersonName">
                Contact Person Name
              </label>
              <input
                className="input-box"
                type="text"
                id="contactPersonName"
                placeholder="Enter your Contact Person Name"
                name="contactPersonName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.contactPersonName && (
                  <div className="form-eror">{formError.contactPersonName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="insuranceStatus">
                Insuarance Status
              </label>
              <select
                className="input-box"
                onChange={handleChange}
                name="insuranceStatus"
                id=""
              >
                <option>--select--</option>
                <option value="new_customer">New Customer</option>
                <option value="existing_customer">Existing Customer</option>
              </select>
              <div className="error">
                {formError.insuranceStatus && (
                  <div className="form-eror">{formError.insuranceStatus}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="agentName">
                Agent Name
              </label>
              <input
                className="input-box"
                type="text"
                id="agentName"
                placeholder="Enter your Agent Name"
                name="agentName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.agentName && (
                  <div className="form-eror">{formError.agentName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="agentEmployeeId">
                Agent Employee Id
              </label>
              <input
                className="input-box"
                type="text"
                id="agentEmployeeId"
                placeholder="Enter your Agent Employee Id"
                name="agentEmployeeId"
                onChange={handleChange}
              />
              <div className="error">
                {formError.agentEmployeeId && (
                  <div className="form-eror">{formError.agentEmployeeId}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="verifyExecutive">
                Verify Executive
              </label>
              <input
                className="input-box"
                type="text"
                id="verifyExecutive"
                placeholder="Enter your Verify Executive"
                name="verifyExecutive"
                onChange={handleChange}
              />
              <div className="error">
                {formError.verifyExecutive && (
                  <div className="form-eror">{formError.verifyExecutive}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="verifyName">
                Verify Name
              </label>
              <input
                className="input-box"
                type="text"
                id="verifyName"
                placeholder="Enter your Verify Name"
                name="verifyName"
                onChange={handleChange}
              />
              <div className="error">
                {formError.verifyName && (
                  <div className="form-eror">{formError.verifyName}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="verifyEmployeeId">
                Verify Employee Id
              </label>
              <input
                className="input-box"
                type="text"
                id="verifyEmployeeId"
                placeholder="Enter yourVerify Employee Id"
                name="verifyEmployeeId"
                onChange={handleChange}
              />
              <div className="error">
                {formError.verifyEmployeeId && (
                  <div className="form-eror">{formError.verifyEmployeeId}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="verifyNumber">
                Verify Number
              </label>
              <input
                className="input-box"
                type="text"
                id="verifyNumber"
                placeholder="Enter your Verify Number"
                name="verifyNumber"
                onChange={handleChange}
              />
              <div className="error">
                {formError.verifyNumber && (
                  <div className="form-eror">{formError.verifyNumber}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="finalStatus">
                Final Status
              </label>
              <select
                className="input-box"
                onChange={handleChange}
                name="finalStatus"
                id=""
              >
                <option>--select--</option>
                <option value="verification_complete">
                  Verification Complete
                </option>
                <option value="incomplete_verification">
                  Incomplete Verification
                </option>
                <option value="file_rejected">File Rejected</option>
              </select>
              <div className="error">
                {formError.finalStatus && (
                  <div className="form-eror">{formError.finalStatus}</div>
                )}
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="insurancePrice">
                Insuarance Price
              </label>
              <input
                className="input-box"
                type="text"
                id="insurancePrice"
                placeholder="Enter your Insuarance Price"
                name="insurancePrice"
                onChange={handleChange}
              />
              <div className="error">
                {formError.insurancePrice && (
                  <div className="form-eror">{formError.insurancePrice}</div>
                )}
              </div>
            </div>
            <div className="input-div col-span-2">
              <label className="input-label" htmlFor="remark">
                Remark
              </label>
              <input
                className="input-box"
                type="text"
                id="remark"
                placeholder="Enter your Remark"
                name="remark"
                onChange={handleChange}
              />
              <div className="error">
                {formError.remark && (
                  <div className="form-eror">{formError.remark}</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-7">
            <button
              type="submit"
              onClick={handleSubmit}
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
