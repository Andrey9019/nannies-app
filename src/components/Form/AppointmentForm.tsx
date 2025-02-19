import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import ThankYouModal from "./ThankyouModal"; // Імпортуємо новий компонент

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/)
      .required(),
    age: Yup.number().positive().integer().required(),
    email: Yup.string().email().required(),
    parentName: Yup.string().required(),
    meetingTime: Yup.string().required(),
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
          phone: "",
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
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col text-xs md:text-base space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
              {/* Address */}
              <div>
                <Field
                  name="address"
                  type="text"
                  placeholder="Address"
                  className={`border-2 rounded-lg px-2 py-1 md:px-4 md:py-2 w-full ${
                    errors.address && touched.address ? "border-red-600" : ""
                  }`}
                />
              </div>

              {/* Phone */}
              <div className="flex items-center w-full">
                <span className="text-gray-500 mx-1">+38</span>
                <Field
                  name="phone"
                  type="text"
                  placeholder="0XXXXXXXXX"
                  maxLength={10}
                  className={`border-2 rounded-lg px-1 py-1 md:px-2 md:py-2 w-full ${
                    errors.phone && touched.phone ? "border-red-600" : ""
                  }`}
                />
              </div>

              {/* Child's age */}
              <div>
                <Field
                  name="age"
                  type="number"
                  placeholder="Child's age"
                  className={`border-2 rounded-lg px-2 py-1 md:px-4 md:py-2 w-full ${
                    errors.age && touched.age ? "border-red-600" : ""
                  }`}
                />
              </div>

              {/* Meeting time */}
              <div className="relative">
                <Field
                  as="select"
                  name="meetingTime"
                  className={`border-2 rounded-lg px-2 py-1 md:px-4 md:py-2 w-full ${
                    errors.meetingTime && touched.meetingTime
                      ? "border-red-600"
                      : ""
                  }`}
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
            </div>

            {/* Email */}
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={`border-2 rounded-lg px-2 py-1 md:px-4 md:py-2 w-full ${
                  errors.email && touched.email ? "border-red-600" : ""
                }`}
              />
            </div>

            {/* Parent's name */}
            <div>
              <Field
                name="parentName"
                type="text"
                placeholder="Father's or mother's name"
                className={`border-2 rounded-lg px-2 py-1 md:px-4 md:py-2 w-full ${
                  errors.parentName && touched.parentName
                    ? "border-red-600"
                    : ""
                }`}
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

      {/* Використовуємо новий компонент */}
      <ThankYouModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default AppointmentForm;
