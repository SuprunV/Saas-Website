import React, { FC, useState } from "react";
import { Row, Card, Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import RegForm from "../components/RegForm";
import Switcher from "../components/UI/Switcher";
import "../styles/authForms.scss";

const AuthPage = () => {
    const [isLogin, setLogin] = useState(true);
    return (
        <Container>
            <Row className="h100 d-flex justify-content-center align-items-center auth-forms">
                <Card className="h-60 p-4 w-50">
                    <Switcher
                        left="Login"
                        right="Register"
                        setValue={setLogin}
                        value={isLogin}
                    />
                    {isLogin ? <LoginForm /> : <RegForm />}
                </Card>
            </Row>
        </Container>
    );
};
export default AuthPage;
