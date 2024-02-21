import { useDispatch, useSelector } from "react-redux";
import {sendOtp, signUp} from '../services/operations/authAPI'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
     Name,
     Email,
     Phone,
     Password
    } = signupData;

    dispatch(
      signUp(
        Name,
        Email,
        Phone,
        Password,
        otp,
        navigate
      )
    );
  };
  return (
    <div className=" w-11/12 m-auto flex flex-col justify-center items-center mt-6">

           <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                Verify Email
              </h1>
              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                A verification code has been sent to you. Enter the code below
              </p>
              <form onSubmit={handleVerifyAndSignup}>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      style={{
                        boxShadow: "inset 0px -1px 0px black",
                        border:"1px solid black"
                      }}
                      className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-black"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />
                <button
                  type="submit"
                  className="w-full bg-green-400 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                >
                  Verify Email
                </button>
              </form>
              <div className="mt-6 flex items-center justify-between gap-x-6">
                <Link to="/signup">
                  <p className="text-richblack-5 flex items-center gap-x-2">
                    <BiArrowBack /> Back To Signup
                  </p>
                </Link>
                <button
                  className="flex items-center text-black gap-x-2"
                  onClick={() => dispatch(sendOtp(signupData.Email))}
                >
                  <RxCountdownTimer />
                  Resend it
                </button>
              </div>
    </div>
  )
}

export default VerifyEmail