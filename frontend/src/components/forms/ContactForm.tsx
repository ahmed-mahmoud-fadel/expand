"use client"

import {  useFormik } from "formik"
import * as yup from 'yup'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import addEntity from "@/actions/addEntity";
import { useState } from "react";

const ContactForm = () => {
  const [responseText, setResponseText] = useState<string | null>(null)
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required."),
      lastName: yup.string().required("Last name is required."),
      email: yup.string().email("You must enter a valid email address.").required("Email is required."),
      message: yup.string().required("A message is required."),
    }),
    onSubmit: async (values) => {
      const response = await addEntity(
        "messages",
        {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          message: values.message,
        },
      )

      if (response.success) setResponseText("Success! We'll get back to you.")
      else setResponseText(response.message)
    }
  })

  return (
    <form id="contact" onSubmit={formik.handleSubmit} className="flex justify-center my-16 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              name="firstName"
              id="firstName"
            />
            {
              formik.errors.firstName && formik.touched.firstName &&
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            }
          </div>
          <Input
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            name="lastName"
            id="lastName"
          />
          {
            formik.errors.lastName && formik.touched.lastName &&
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          }
          <Input
            placeholder="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            id="email"
          />
          {
            formik.errors.email && formik.touched.email &&
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          }
          <Textarea
            placeholder="Type your message here."
            value={formik.values.message}
            onChange={formik.handleChange}
            name="message"
            id="message"
          />
          {
            formik.errors.message && formik.touched.message &&
            <p className="text-red-500 text-sm">{formik.errors.message}</p>
          }
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          {
            responseText && <p className="font-bold">{responseText}</p>
          }
          <Button
            className="w-full text-white"
            type="submit"
          >
            Send
          </Button>
        </CardFooter>
      </Card>
    </form>

  );
}
 
export default ContactForm;