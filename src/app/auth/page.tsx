"use client";

import ParsingQuery from "@/app/auth/AuthComponent/ParsingQuery";
export default function Authpage() {

    return(
        <div>
            <div className="token" style={{ display: "flex", justifyContent: "center" }}>
                <ParsingQuery />
            </div>
        </div>
    );
}