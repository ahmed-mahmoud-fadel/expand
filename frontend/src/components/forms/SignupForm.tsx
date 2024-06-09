"use client"

import { useFormik } from "formik";
import * as yup from 'yup'
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import signup from "@/actions/signup";
import { FaEye, FaInfo } from "react-icons/fa";
// import login from "@/actions/login";
// import { setCookie } from "@/global/cookie";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  // const router = useRouter()
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      companyName: "",
      email: "",
      password: "",
      confPassword: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required().trim().label("First name").matches(/^[a-z]+$/i, "First name must only contain letters.").max(10),
      lastName: yup.string().required().trim().label("Last name").matches(/^[a-z]+$/i, "Last name must only contain letters.").max(10),
      username: yup.string().required().trim().label("Username").matches(/^([a-z]|_|[0-9])+$/i, "Username must only contain letters, numbers, and underscores.").max(15),
      companyName: yup.string().required().trim().label("Comapny name").matches(/^([a-z]| )+$/i, "Company name must only contain letters.").max(25),
      email: yup.string().email().required().label("Company email").max(75),
      password: yup.string().required().label("Password").min(8).max(15)
      .matches(/[a-z]/, "Password must contain at least one lowercase character.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase character.")
      .matches(
        /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\./\?\|\\]/,
        "Password must contain at least one symbol."
      )
      .matches(/[0-9]/, "Password must contain at least one digit."),
      confPassword: yup.string().required().label("Confirm password").max(15),
    }),
    validate: (values) => {
      setError(null)
      setMessage(null)
      if (values.password !== values.confPassword)
      return {
        confPassword: "Password does not match."
      }
    },
    onSubmit: async (values) => {
      const signupResopnse = await signup(values)

      if (!signupResopnse.success) {
        setError(signupResopnse.message)
        return
      }

      setMessage("Success! A verification email has been sent to you.")

      // const loginResponse = await login({
      //   email: values.email,
      //   password: values.password,
      // })

      // if (!loginResponse.valid) {
      //   setError(loginResponse.message)
      //   return 
      // }

      // setCookie("jwt", loginResponse.data.token, { expires: loginResponse.data.exp, path: "/" })
      // setCookie("id", loginResponse.data.id, { expires: loginResponse.data.exp, path: "/" })

      // router.push('/dashboard')
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <Card className="p-4 flex flex-col items-center gap-3">
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            name="firstName"
            id="firstName"
            type="text"
          />
          {
            formik.errors.firstName && formik.touched.firstName &&
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            name="lastName"
            id="lastName"
            type="text"
          />
          {
            formik.errors.lastName && formik.touched.lastName &&
            <p className="text-red-500 text-sm w-full">{formik.errors.lastName}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Company name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            name="companyName"
            id="companyName"
            type="text"
          />
          {
            formik.errors.companyName && formik.touched.companyName &&
            <p className="text-red-500 text-sm w-full">{formik.errors.companyName}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Company email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            id="email"
            type="email"
          />
          {
            formik.errors.email && formik.touched.email &&
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
            id="username"
            type="text"
          />
          {
            formik.errors.email && formik.touched.username &&
            <p className="text-red-500 text-sm">{formik.errors.username}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2 relative">
            {
              showTooltip &&
              <ul className="rounded-lg border p-2 pl-6 absolute top-0 translate-y-[-100%] right-0 list-disc bg-background">
                <li>Must be at least 8 characters long.</li>
                <li>Must be less than 15 characters.</li>
                <li>Must include at least one lowercase letter.</li>
                <li>Must include at least one uppercase letter.</li>
                <li>Must include at least one digit.</li>
                <li>Must include at least one symbol.</li>
              </ul>
            }
            <Input
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
            />
            <Button
            variant="outline"
            type="button"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            >
              <FaEye/>
            </Button>
            <Button
            variant="outline"
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            >
              <FaInfo />
            </Button>
          </div>
          {
            formik.errors.password && formik.touched.password &&
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Confirm password"
            value={formik.values.confPassword}
            onChange={formik.handleChange}
            name="confPassword"
            id="confPassword"
            type={showPassword ? "text" : "password"}
          />
          {
            formik.errors.confPassword && formik.touched.confPassword &&
            <p className="text-red-500 text-sm">{formik.errors.confPassword}</p>
          }
        </div>
        {
          error && 
          <p className="text-red-500 text-sm">{error}</p>
        }
        {
          message &&
          <p className="font-bold text-sm text-green-700 bg-green-300 px-5 py-2 text-center rounded-full">
            {message}
          </p>
        }
        <Button type="submit" className="text-white w-full">Sign up</Button>
      </Card>
    </form>
  );
}
 
export default SignupForm;