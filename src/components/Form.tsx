'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./Button";
import { CreateUserPayload } from "@/lib/validators";

const Form = () => {
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false); // State to manage form submission success

  useEffect(() => {
    const postForm = async () => {
      const payload: CreateUserPayload = { email, dateOfBirth: dateOfBirth, age, password };
      try {
        const response = await axios.post("/api/create", payload);
        console.log(response.data);
        setSuccess(true); // Set success to true upon successful form submission
      } catch (error) {
        console.error(error);
      } finally {
        setEmail("");
        setDob("");
        setAge(0);
        setPassword("");
      }
    };

    if (submit) {
      postForm();
      setSubmit(false);
    }
  }, [submit, email, age, password, dateOfBirth, success]);
  
  const [dateInputType, setDateInputType] = useState("text");
  const handleDateFocus = () => setDateInputType("date");

  const handleDateBlur = (event) => {
    if (!event.target.value) setDateInputType("text");
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSubmit(true);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-4 bg-white p-6 rounded shadow">
        <h1 className="text-teal-500 text-3xl text-center font-serif">User Registered.</h1>
        <Button className="mt-5 py-2 px-4 rounded-full font-serif" onClick={() => setSuccess(false)}>
          Register Another
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-4 bg-white p-6 rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm " htmlFor="email">
  Email:
</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="dob">
            Date of Birth:
          </label>
          <input
            id="dob"
            type={dateInputType}
            value={dateOfBirth}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            onChange={({ target: { value } }) => setDob(value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
            required
          />
        </div>

        <div>
          <label className="block text-sm" htmlFor="age">
            Age:
          </label>
          <select
            id="age"
            value={age}
            onChange={({ target: { value } }) => setAge(Number(value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required>
            <option value="" className="text-center"></option>
            {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <Button type="submit" className="bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
