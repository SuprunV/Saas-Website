import React, { FC, useContext } from "react";
import { Context } from "..";

const HomePage: FC = ({}) => {
    const { User } = useContext(Context);
    return (
        <div className="h100 d-flex justify-content-center align-items-center auth-forms flex-column">
            <h1>Home page</h1>
            <hr />
            <h2>
                Dear {User.user.name} ({User.user.role}),
                <br />
                Soon here will be your data!
            </h2>
        </div>
    );
};
export default HomePage;
