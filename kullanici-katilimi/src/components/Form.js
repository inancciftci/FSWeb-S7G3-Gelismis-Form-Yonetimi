import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";

export default function Form({ members, setMembers }) {
  const [member, setMember] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    terms: false,
  });

  const [formValid, setFormValid] = useState(false);

  const userSchema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6, "Password has to be at least 6 characters."),
    terms: yup.boolean().required(),
  });

  const inputChangeHandler = (e) => {
    const { name, value, checked } = e.target;
    const inputVal = name === "terms" ? checked : value;
    setMember({ ...member, [name]: inputVal });

    yup
      .reach(userSchema, name)
      .validate()
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("https://reqres.in/api/users", member).then((res) => {
      console.warn("Üye başarıyla kaydedildi.", res.data);
    });
  };

  useEffect(() => {
    console.log("Üye: ", member);
    userSchema.isValid(member).then((valid) => setFormValid(valid));
  }, [member]);

  useEffect(() => {
    console.log("formValid: ", formValid);
  }, [formValid]);

  useEffect(() => {
    console.log("formErrors: ", formErrors);
  }, [formErrors]);

  return (
    <form onSubmit={submitHandler}>
      <div className="nameBox">
        <label htmlFor="name">
          {" "}
          Name:
          <input
            onChange={inputChangeHandler}
            name="name"
            type="text"
            placeholder="Name"
            value={member.name}
          />
        </label>
        <label htmlFor="surname">
          {" "}
          Surname:
          <input
            onChange={inputChangeHandler}
            name="surname"
            type="text"
            placeholder="Surname"
            value={member.surname}
          />
        </label>
      </div>
      <label htmlFor="email">
        Email:
        <input
          onChange={inputChangeHandler}
          name="email"
          type="text"
          placeholder="Enter your email"
          value={member.email}
        />
      </label>
      <label htmlFor="name">
        Password:
        <input
          onChange={inputChangeHandler}
          name="password"
          type="password"
          placeholder="Enter your password"
          value={member.password}
        />
      </label>
      <div className="terms-box">
        <input
          onChange={inputChangeHandler}
          type="checkbox"
          name="terms"
          id="terms"
        />
        <label htmlFor="terms">Kullanım Şartları'nı kabul ediyorum.</label>
      </div>

      <div className="btn-box">
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
}
