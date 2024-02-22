import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword, updateUser } from "../services/operations/authAPI";
import { userSchema } from '../Validate';
import { useFormik } from "formik";

const Profile = ({ open, setOpen }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [tab, setTab] = useState(1);

    const dispatch = useDispatch();

    const onSubmitProfile = async (values, actions) => {
       
        dispatch(updateUser(values, token));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // actions.resetForm();
    };

    const onSubmitPassword = async (values, actions) => {
    
        dispatch(ChangePassword(token, values));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // actions.resetForm();
    };

    const profileFormik = useFormik({
        initialValues: {
            Name: user.Name,
            Email: user.Email,
            Phone: user.Phone,
        },
        validationSchema: userSchema,
        onSubmit: onSubmitProfile,
    });
    const {values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit} = profileFormik

    const passwordFormik = useFormik({
        initialValues: {
            Password: "",
            NewPassword: "",
            ConfirmNewPassword: "",
        },
        validationSchema: userSchema, // Assuming you have the same schema for password change as for user update
        onSubmit: onSubmitPassword,
    });

    return (
        <div className="flex flex-row  gap-x-16 mt-4 pt-4 ">
            {/* Profile Details Tab */}
            {tab === 1 && (
                <div className={`${open === true ? "hidden sm:flex" : ""} flex flex-col justify-center items-start ml-7`}>
                    {/* Profile Details Content */}
                </div>
            )}

            {/* Edit Profile Tab */}
            {tab === 2 && (
                <form className="flex flex-col justify-center items-center gap-y-5 " onSubmit={profileFormik.handleSubmit}>
                    {/* Edit Profile Form */}
                </form>
            )}

            {/* Change Password Tab */}
            {tab === 3 && (
                <form className="flex flex-col justify-center items-center gap-y-5" onSubmit={passwordFormik.handleSubmit}>
                    {/* Change Password Form */}
                </form>
            )}

            {/* Buttons to switch between tabs */}
        </div>
    );
};

export default Profile;
