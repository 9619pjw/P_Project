"use client";

import Image from 'next/image';
import Link from "next/link";

export default function LoginButton(){
    const url: string = "https://funsns.shop:8000/user-service/oauth2/authorization/naver";

    return (
        <div className="loginNaver">
            <Link href={url}>
                <Image
			        src="/login.png"
			        alt="Login"
			        width={128}
			        height={128}
		        />
            </Link>
        </div>
    );
}