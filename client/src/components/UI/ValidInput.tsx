import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface ValidInputProps {
  showError: (item: string) => React.ReactElement;
  value: string[] | null | undefined;
  onChange: (e: any) => void;
  title: string;
  placeholder: string;
  type?: string;
}

const ValidInput: FC<ValidInputProps> = ({
  value,
  showError,
  onChange,
  title,
  placeholder,
  type = "text",
}) => {
  const showErrors = () => {
    return value?.map(showError);
  };
  return (
    <>
      <div className="form-invalid">{value && showErrors()}</div>
      <div className="input-group mt-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="">
            {title}
          </span>
        </div>
        <Form.Control
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          data-isinvalid={value}
        />
      </div>
    </>
  );
};
export default ValidInput;
