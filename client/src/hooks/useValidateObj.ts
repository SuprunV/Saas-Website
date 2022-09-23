import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StatusEnum } from "../components/UI/FormWrap";
import { RolesEnum } from "../types/systemRoles";

export interface IValidateOptions {
  minLength?: number;
  maxLength?: number;
  email?: boolean;
}

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const getValidatedMsg = (value: any, options: IValidateOptions): string[] => {
  //validation options for value
  //options
  var msg = [];
  for (let optionName in options) {
    switch (optionName) {
      case "minLength":
        if (options.minLength && value.length < options.minLength) {
          msg.push(`Min length is ${options.minLength}`);
        }
        break;
      case "maxLength":
        if (options.maxLength && value.length > options.maxLength) {
          msg.push(`Max length is ${options.maxLength}`);
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          msg.push(`Value must be email`);
        }
        break;
    }
  }
  return msg;
};

export const useValidateObj = (objToValidate: any, validateOptions: any) => {
  const [msgTexts, setMsgTexts] = useState<any>({});
  const msgTextsCurrent = useRef();
  const isValidCur = useRef<boolean | undefined>();
  const [isValid, setIsValid] = useState<boolean>();

  const validateObj = () => {
    var newMsg: any = {};
    for (let key in objToValidate) {
      //key is login
      if (key in validateOptions) {
        //exists validate options for login
        let validateMsg = getValidatedMsg(
          objToValidate[key],
          validateOptions[key]
        );
        if (validateMsg.length) {
          newMsg[key] = validateMsg;
        }
      }
    }
    msgTextsCurrent.current = newMsg;
    setMsgTexts(newMsg);
    isValidCur.current = Object.keys(newMsg).length <= 0;
    setIsValid(Object.keys(newMsg).length <= 0);
  };

  return {
    validateObj,
    isValid,
    isValidCur,
    msgTextsCurrent,
    msgTexts,
  };
};
