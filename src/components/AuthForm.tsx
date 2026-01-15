"use client";
import {
  TextField,
  Button,
  Paper,
  Grid,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";

import { useState } from "react";

const AuthForm = ({ mode }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        alert("Successfully logged in!");
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={true}>
      <DialogTitle>{mode === "register" ? "Регистрация" : "Вход"}</DialogTitle>
      <DialogContent>
        <form className="flex flex-col gap-4 w-100">
          <TextField
            required
            fullWidth
            label="User name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleInputChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button>Отменить</Button>
        <Button type="submit">
          {mode === "register" ? "Зарегистрироваться" : "Войти"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthForm;
