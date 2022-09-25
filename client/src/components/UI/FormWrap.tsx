import React, { FC, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
export enum StatusEnum {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
}

interface FormWrapProps {
  msgStatus: StatusEnum;
  msgText: string;
  children: React.ReactNode;
  submitAction: () => void;
}

const FormWrap: FC<FormWrapProps> = ({
  msgStatus,
  msgText,
  children,
  submitAction,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAction();
  };

  const [alertClasses, setAlertClasses] = useState<string[]>(["alert"]);

  useMemo(() => {
    switch (msgStatus) {
      case StatusEnum.ERROR:
        setAlertClasses(["alert mt-3", "alert-danger"]);
        break;
      case StatusEnum.LOADING:
        setAlertClasses(["alert mt-3", "alert-warning"]);
        break;
      case StatusEnum.SUCCESS:
        setAlertClasses(["alert mt-3", "alert-success"]);
        break;
    }
  }, [msgStatus]);

  return (
    <Form onSubmit={handleSubmit}>
      {msgText && (
        <div className={alertClasses.join(" ")} role="alert">
          {msgText}
        </div>
      )}
      {children}
    </Form>
  );
};
export default FormWrap;
