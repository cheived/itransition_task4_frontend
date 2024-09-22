import AuthForm from "../../components/AuthForm/AuthForm";

const RegisterPage = () => {
  return (
    <>
      <AuthForm
        title="Enter your name, email and password"
        link="Want to log in?"
        linkTo="/login"
        inputFields={[
          { title: "Name" },
          { title: "Email" },
          { title: "Password" },
        ]}
        buttonText="Register"
        sendTo="/auth/register"
      />
    </>
  );
};

export default RegisterPage;
