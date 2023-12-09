"use client";

import { useEffect, useState } from 'react';
import { Navbar as NextUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@nextui-org/navbar";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import Image from 'next/image';
import Link from "next/link";

import Notification from './Notification';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

import { Logo } from "@/components/icons";

export const Navbar = () => {
	
	const [isLogin, setIsLogin] = useState(false);
	useEffect(() => {
    	const localStorage: Storage = window.localStorage;
    	const token = localStorage.getItem("accessToken");
    	const expiredTime = localStorage.getItem("expiredTime");
    	if (token && expiredTime) {
			setIsLogin(true);
    	} else {
		setIsLogin(false);
    	}
	}, []);

	useEffect(() => {
		const checkLoginStatus = () => {
		  const token = window.localStorage.getItem('accessToken');
		  setIsLogin(!!token);
		};
	
		// 로그인 상태를 처음 확인합니다.
		checkLoginStatus();
	
		// 1초마다 로그인 상태를 확인합니다.
		const intervalId = setInterval(checkLoginStatus, 1000);
	
		// 컴포넌트가 언마운트될 때 setInterval을 정리합니다.
		return () => {
		  clearInterval(intervalId);
		};
	  }, []);


	const loginImage = <LoginButton />;
	const logoutImage = <LogoutButton />;


	const url: string = "https://funsns.shop:8000/user-service/oauth2/authorization/naver";

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit"></p>
					</NextLink>
				</NavbarBrand>
				{isLogin &&(
					<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
				)}	
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">
					{/* <Link href ={url}>
						{loginImage}
					</Link> */}
					<Notification />
					{isLogin ? logoutImage : loginImage}
				</NavbarItem>
				<NavbarItem className="hidden md:flex">

				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
