import React, { FC } from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import { RouteNames } from '../routes/routes';

interface AppNavbarProps {

}

const AppNavbar: FC<AppNavbarProps> = ({ }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={RouteNames.HOME}>
                    React Bootstrap
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
export default AppNavbar;