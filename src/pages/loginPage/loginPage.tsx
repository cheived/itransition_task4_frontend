import AuthForm from "../../components/AuthForm/AuthForm";

const LoginPage = () => {
  return (
    <>
      <AuthForm
        title="Enter your email and password"
        link="Want to register?"
        linkTo="/register"
        inputFields={[{ title: "Email" }, { title: "Password" }]}
        buttonText="Login"
        sendTo="/auth/login"
      />
    </>
  );
};

export default LoginPage;
