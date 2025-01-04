/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button";

import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

const generateTimeOptions = () => {
  const options = [];
  let startTime = 9; // Починаємо з 09:00
  while (startTime < 18) {
    options.push(`${String(startTime).padStart(2, "0")}:00`);
    options.push(`${String(startTime).padStart(2, "0")}:30`);
    startTime += 1; // Наступна година
  }
  options.push("18:00"); // Додаємо останній слот
  return options;
};

const AppointmentForm = ({ onSubmit }) => {
  const [timePickerFocused, setTimePickerFocused] = useState(false);

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/, "Invalid phone number (e.g. +380XXXXXXXXX)")
      .required("Phone is required"),
    age: Yup.number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Child's age is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    parentName: Yup.string().required("Father's or mother's name is required"),
    meetingTime: Yup.string().required("Meeting time is required"),
    comment: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        address: "",
        phone: "+380",
        age: "",
        email: "",
        parentName: "",
        meetingTime: "",
        comment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-x-2 gap-y-4">
            {/* Address */}
            <div>
              <Field
                name="address"
                type="text"
                placeholder="Address"
                className="border rounded-lg px-4 py-2 w-full"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <Field
                name="phone"
                type="text"
                placeholder="+380"
                className="border rounded-lg px-4 py-2 w-full"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Child's age */}
            <div>
              <Field
                name="age"
                type="number"
                placeholder="Child's age"
                className="border rounded-lg px-4 py-2 w-full"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Meeting time */}
            <div className="relative">
              <Field
                as="select"
                name="meetingTime"
                className={`border rounded-lg px-4 py-2 w-full appearance-none ${
                  timePickerFocused ? "border-[#103931]" : ""
                }`}
                onFocus={() => setTimePickerFocused(true)}
                onBlur={() => setTimePickerFocused(false)}
              >
                <option value="" disabled>
                  Meeting time
                </option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Field>
              <AiOutlineClockCircle
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <ErrorMessage
                name="meetingTime"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border rounded-lg px-4 py-2 w-full"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Parent's name */}
          <div>
            <Field
              name="parentName"
              type="text"
              placeholder="Father's or mother's name"
              className="border rounded-lg px-4 py-2 w-full"
            />
            <ErrorMessage
              name="parentName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Comment */}
          <div>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className="border rounded-lg px-4 py-2 min-h-12 max-h-28 w-full"
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <Button
            type="submit"
            className="hover:bg-[#10393133]"
            disabled={isSubmitting}
            text="Send"
          ></Button>
        </Form>
      )}
    </Formik>
  );
};

export default AppointmentForm;
