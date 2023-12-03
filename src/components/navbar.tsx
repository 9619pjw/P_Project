"use client";

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import Image from 'next/image';
import Link from "next/link";


import { Logo } from "@/components/icons";

export const Navbar = () => {
	const loginImage = (
	<button> 
		{/* // onClick={() => router.push('/login')} */}
		
		<Image
			src="/login.png"
			alt="Login"
			width={128}
			height={128}
		/>
	</button>
    );
	const url: string =
    "https://funsns.shop/user-service/oauth2/authorization/naver";

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit"></p>
					</NextLink>
				</NavbarBrand>
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
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					{/* <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.discord} aria-label="Discord">
						<DiscordIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link> */}
					{/* 다크테마 삭제 예정 */}
					{/* <ThemeSwitch /> */}
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">
					<Link href ={url}>
						{loginImage}
					</Link>
				</NavbarItem>
				<NavbarItem className="hidden md:flex">

				</NavbarItem>
			</NavbarContent>

			
		</NextUINavbar>
	);
};
