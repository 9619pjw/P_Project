# P-실무 프로젝트
크라우드 펀딩 SNS 서비스입니다.
Creating applications using Next.js 13 (app directory) and NextUI (v2).

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use


### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## License
Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).

```
P_Project
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           └─ main
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ LICENSE
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ barcode.png
│  ├─ bell.png
│  ├─ crowd.png
│  ├─ default-profile.png
│  ├─ dev.png
│  ├─ docker.jpg
│  ├─ favicon.ico
│  ├─ funding.png
│  ├─ funs.png
│  ├─ gifticon.png
│  ├─ login.png
│  ├─ Logo.png
│  ├─ logout.png
│  ├─ match.png
│  ├─ newsfeed.png
│  ├─ next.svg
│  ├─ post.png
│  ├─ search.png
│  ├─ user.png
│  └─ vercel.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ admin
│  │  │  ├─ newsfeed
│  │  │  │  ├─ detail
│  │  │  │  │  └─ [id]
│  │  │  │  │     ├─ likefeed
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ post
│  │  │  │  ├─ create
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ detail
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ list
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ login
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ modify
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ notices
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ signup
│  │  │  │     └─ page.tsx
│  │  │  └─ store
│  │  │     └─ page.tsx
│  │  ├─ auth
│  │  │  ├─ AuthComponent
│  │  │  │  ├─ CheckNickButton.tsx
│  │  │  │  ├─ ExportUserInfoButton.tsx
│  │  │  │  └─ ParsingQuery.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ signup
│  │  │     └─ page.tsx
│  │  ├─ error.tsx
│  │  ├─ Home.module.css
│  │  ├─ layout.tsx
│  │  ├─ loading.tsx
│  │  ├─ newsfeed
│  │  │  ├─ create
│  │  │  │  └─ page.tsx
│  │  │  ├─ detail
│  │  │  │  └─ [id]
│  │  │  │     ├─ likefeed
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ modify
│  │  │  │     │  └─ page.tsx
│  │  │  │     └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ point
│  │  │  └─ page.tsx
│  │  ├─ post
│  │  │  ├─ create
│  │  │  │  └─ page.tsx
│  │  │  ├─ detail
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  ├─ list
│  │  │  │  └─ page.tsx
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  ├─ modify
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  ├─ notices
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ signup
│  │  │     └─ page.tsx
│  │  ├─ profile
│  │  │  ├─ page.tsx
│  │  │  └─ [id]
│  │  │     ├─ follower
│  │  │     │  └─ page.tsx
│  │  │     ├─ following
│  │  │     │  └─ page.tsx
│  │  │     ├─ page.tsx
│  │  │     └─ profileComponent
│  │  │        ├─ InsertProfileImage.tsx
│  │  │        ├─ IsYours.tsx
│  │  │        ├─ ProfileInfo.tsx
│  │  │        ├─ ProfileMenu.tsx
│  │  │        └─ ShowSearchList.tsx
│  │  ├─ project
│  │  │  ├─ create
│  │  │  │  └─ page.tsx
│  │  │  ├─ detail
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  ├─ funded
│  │  │  │  └─ page.tsx
│  │  │  ├─ list
│  │  │  │  └─ page.tsx
│  │  │  ├─ myproject
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ providers.tsx
│  │  ├─ store
│  │  │  ├─ order
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ received
│  │  │  │  └─ page.tsx
│  │  │  └─ sent
│  │  │     └─ page.tsx
│  │  └─ timeline
│  │     ├─ create
│  │     │  └─ page.tsx
│  │     ├─ detail
│  │     │  └─ [id]
│  │     │     ├─ likefeed
│  │     │     │  └─ page.tsx
│  │     │     ├─ modify
│  │     │     │  └─ page.tsx
│  │     │     └─ page.tsx
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ counter.tsx
│  │  ├─ icons.tsx
│  │  ├─ LoginButton.tsx
│  │  ├─ LogoutButton.tsx
│  │  ├─ ModalCustom.tsx
│  │  ├─ navbar.tsx
│  │  ├─ Notification.tsx
│  │  ├─ primitives.ts
│  │  ├─ ReadNotification.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ theme-switch.tsx
│  │  └─ utils.tsx
│  ├─ config
│  │  ├─ fonts.ts
│  │  └─ site.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ types
│     └─ index.ts
├─ tailwind.config.js
└─ tsconfig.json
```