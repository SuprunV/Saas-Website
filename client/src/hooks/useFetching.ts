import { useState, useEffect } from "react";
import { StatusEnum } from "../components/UI/FormWrap";

export const useFetching = (request: (...args: any[]) => Promise<any>) => {
    const [status, setStatus] = useState<StatusEnum>(StatusEnum.ERROR);
    const [msg, setMsg] = useState("");

    const fetching = async (args: any[] = []) => {
        try {
            console.log("try");
            setStatus(StatusEnum.LOADING);
            setMsg("Is loading...");
            await request(...args);
            setStatus(StatusEnum.SUCCESS);
            setMsg("Request is successful!");
        } catch (e: any) {
            setMsg(e.message);
            setStatus(StatusEnum.ERROR);
        } finally {
            setTimeout(() => {
                setStatus(StatusEnum.ERROR);
                setMsg("");
            }, 3000);
        }
    };

    return { fetching, status, msg };
};
