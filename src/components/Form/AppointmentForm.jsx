import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

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

const AppointmentForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
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
          console.log("Form values:", values);
          resetForm();
          setIsModalOpen(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col text-xs md:text-base space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
              {/* Address */}
              <div>
                <Field
                  name="address"
                  type="text"
                  placeholder="Address"
                  className="border rounded-lg px-2 py-1 md:px-4 md:py-2 w-full"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-xs md:text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <Field
                  name="phone"
                  type="text"
                  placeholder="+380"
                  className="border rounded-lg px-2 py-1 md:px-4 md:py-2 w-full"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs md:text-sm"
                />
              </div>

              {/* Child's age */}
              <div>
                <Field
                  name="age"
                  type="number"
                  placeholder="Child's age"
                  className="border rounded-lg px-2 py-1 md:px-4 md:py-2 w-full"
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500 text-xs md:text-sm"
                />
              </div>

              {/* Meeting time */}
              <div>
                <div className="relative">
                  <Field
                    as="select"
                    name="meetingTime"
                    className="border rounded-lg px-2 py-1 md:px-4 md:py-2 w-full appearance-none"
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
                    className="hidden md:flex absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                </div>
                <ErrorMessage
                  name="meetingTime"
                  component="div"
                  className="text-red-500 text-xs md:text-sm mt-1"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border rounded-lg px-2 py-1 md:px-4 md:py-2 w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs md:text-sm"
              />
            </div>

            {/* Parent's name */}
            <div>
              <Field
                name="parentName"
                type="text"
                placeholder="Father's or mother's name"
                className="border rounded-lg px-2 py-1 md:px-4 md:py-2 w-full"
              />
              <ErrorMessage
                name="parentName"
                component="div"
                className="text-red-500 text-xs md:text-sm"
              />
            </div>

            {/* Comment */}
            <div>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className="border rounded-lg px-2 py-1 md:px-4 md:py-2 min-h-12 max-h-28 w-full"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="text-red-500 text-xs md:text-sm"
              />
            </div>

            <Button
              type="submit"
              className="hover:bg-[--hover-prime]"
              disabled={isSubmitting}
              text="Send"
            />
          </Form>
        )}
      </Formik>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              <IoMdClose className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Thank you!</h2>
            <p className="text-gray-600 mb-4">
              Please wait for your meeting confirmation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
