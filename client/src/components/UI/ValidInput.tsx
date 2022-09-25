import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface ValidInputProps {
    showError: (item: string) => React.ReactElement;
    errors: string[] | null | undefined;
    value: string | number;
    onChange: (e: any) => void;
    title: string;
    placeholder: string;
    type?: string;
}

const ValidInput: FC<ValidInputProps> = ({
    errors,
    value,
    showError,
    onChange,
    title,
    placeholder,
    type = "text",
}) => {
    const showErrors = () => {
        return errors?.map(showError);
    };
    return (
        <>
            <div className="form-invalid">{errors && showErrors()}</div>
            <div className="input-group mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                        {title}
                    </span>
                </div>
                <Form.Control
                    onChange={onChange}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    data-isinvalid={errors}
                />
            </div>
        </>
    );
};
export default ValidInput;
