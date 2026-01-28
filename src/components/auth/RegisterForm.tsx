import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import { RegisterFormData, registerSchema } from "./schema";
import { TextField, Button, Dialog, Typography } from "@mui/material";
import { Link, useRouter } from "@tanstack/react-router";
import { useRegisterMutation } from "../../services";
import { http } from "../../api";

export const RegisterForm = () => {
  const {
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const { navigate } = useRouter();

  const [register] = useRegisterMutation();

  const {
    username,
    firstName,
    lastName,
    password,
    repeatPassword,
    email,
    phone,
  } = watch();

  const handleFinish = async values => {
    try {
      const data = await http.post(`auth/register`, values);

      const token = data.data.accessToken;
      if (!token) {
        throw new Error("Токены не найдены");
      }
      localStorage.setItem("accessToken", `Bearer ${token}`);

      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
    } finally {
      // navigate({ to: "/auth/login" });
    }
  };

  return (
    <Dialog open={true}>
      <div className="flex flex-col p-5 gap-4">
        <Typography variant="h6">Регистрация</Typography>
        <div className="flex flex-col gap-4 w-100">
          <TextField
            required
            fullWidth
            label="Имя пользователя"
            type="text"
            value={username}
            onChange={e => setValue("username", e.target.value)}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            required
            fullWidth
            label="Имя"
            type="text"
            value={firstName}
            onChange={e => setValue("firstName", e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            required
            fullWidth
            label="Фамилия"
            type="text"
            value={lastName}
            onChange={e => setValue("lastName", e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            required
            fullWidth
            label="Номер телефона"
            type="phone"
            value={phone}
            onChange={e => setValue("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            required
            fullWidth
            label="Электронная почта"
            type="email"
            value={email}
            onChange={e => setValue("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            required
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={e => {
              console.log(typeof e.target.value);
              setValue("password", e.target.value ?? "", {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            required
            fullWidth
            label="Повтор пароля"
            type="password"
            value={repeatPassword}
            onChange={e => setValue("repeatPassword", e.target.value)}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />
        </div>
        <div className="flex flex-row justify-end gap-5">
          <Button color="primary" type="submit">
            <Link to="/">Отмена</Link>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleFinish)}
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
