import React, { FC, useContext } from "react";
import { Context } from "..";

const SearchPage = ({}) => {
    const { User } = useContext(Context);
    return (
        <div className="h100 d-flex justify-content-center align-items-center auth-forms flex-column">
            <h1>Search page</h1>
            <hr />
            <h2>
                Dear {User.user.name} ({User.user.role}),
                <br />
                Soon you will search here beauty services!
            </h2>
        </div>
    );
};
export default SearchPage;
