import React, { useEffect, useState } from 'react'; // Import useState
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './loginPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { EMAIL } from '../../constants/patterns';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'john@gmail.com',  // Pre-fill email
      password: '12345',        // Pre-fill password
    },
  });

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        
        {/* Note message for default values */}
        <p className={classes.note}>
          Use the default values to login or enter your credentials.
        </p>

        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: EMAIL,
            })}
            error={errors.email}
          />

          <div className={classes.passwordContainer}>
            <Input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              label="Password"
              {...register('password', {
                required: true,
              })}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)} // Toggle state
              className={classes.togglePassword} // Add a class for styling
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>

          <Button type="submit" text="Login" />

          <div className={classes.register}>
            New user? &nbsp;
            <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

