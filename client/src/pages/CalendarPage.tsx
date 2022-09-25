import React, { FC, useContext } from "react";
import { Context } from "..";

const CalendarPage: FC = ({}) => {
    const { User } = useContext(Context);
    return (
        <div>
            <div className="h100 d-flex justify-content-center align-items-center auth-forms flex-column">
                <h1>Calendar page</h1>
                <hr />
                <h2>
                    Dear {User.user.name} ({User.user.role}),
                    <br />
                    Soon here will be your events!
                </h2>
            </div>
        </div>
    );
};
export default CalendarPage;
