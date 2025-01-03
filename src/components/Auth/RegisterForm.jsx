import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await updateProfile(userCredential.user, { displayName: values.name });
      alert("Registration successful!");
      resetForm();
      navigate("/nannies");
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="text-black auth-form max-h-max max-w-[560px] p-16 bg-white rounded-[30px] shadow-lg ">
      <h2 className="text-[40px] font-medium mb-5">Registration</h2>
      <p className="text-gray-500 mb-10">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="relative mb-6">
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            <div className="relative mb-6">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            <div className="relative mb-8">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaRegEyeSlash size={24} />
                ) : (
                  <FaRegEye size={24} />
                )}
              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-green-900 text-white text-lg font-medium rounded-[12px] hover:bg-green-700 transition-all duration-300"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
