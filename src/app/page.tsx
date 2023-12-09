import { title } from "@/components/primitives";


export default function Home() {
	return (
		<div className="w-[1440px] h-[1876px]  bg-white flex-col justify-start items-center inline-flex">
			<div className="self-stretch px-[170px] py-[60px] justify-center items-center gap-[60px] inline-flex  mx-auto">
				<div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
					<div className="self-stretch text-black text-[40px] font-bold font-['Arial'] leading-[48px]">당신의 아이디어로 꿈을 이루는 시작 &nbsp;
						<img src="/funs.png" alt="Funs image" className="self-stretch" />
					</div>
					
				</div>
				<div className="grow shrink basis-0 h-[400px] py-1 justify-start items-start flex">
				<img src="/funding.png" alt="Funding image" className="w-[520px] h-[392px] rounded-md" />
				</div>
			</div>
			<div className="self-stretch px-[170px] py-[60px] justify-center items-center gap-[60px] inline-flex">
				<div className="grow shrink basis-0 py-5 flex-col justify-center items-center gap-10 inline-flex">
					<div className="self-stretch justify-start items-center gap-10 inline-flex">
						<div className="grow shrink basis-0 h-48 p-4 rounded-md border border-black border-opacity-10 justify-center items-start gap-4 flex">
							<div className="w-[100px] h-[100px] justify-start items-start flex">
							<div className="w-[100px] h-[100px] relative" style={{backgroundImage: `url(/docker.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
							</div>
							<div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
								<div className="self-stretch text-black text-xl font-medium font-['Roboto'] leading-7">클라우드 네이티브</div>
								<div className="self-stretch text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight">대학(원)</div>
								<div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">도커 / 쿠버네티스를 활용한 프로젝트입니다</div>
								<div className="self-stretch py-1 justify-start items-center gap-1.5 inline-flex">
									<div className="w-10 h-5 px-1 py-0.5 bg-zinc-300 bg-opacity-50 rounded-sm border border-black border-opacity-10 justify-center items-center gap-0.5 flex">
										<div className="text-black text-xs font-normal font-['Roboto'] leading-none">new!</div>
									</div>
								</div>
								<div className="self-stretch py-1 justify-start items-center gap-2 inline-flex">
									<div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
										<div className="w-5 h-5 relative bg-black bg-opacity-10 rounded-[20px]" />
										<div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
											<div className="self-stretch h-5 text-black text-sm font-medium font-['Roboto'] leading-tight">김진우</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="self-stretch justify-start items-center gap-10 inline-flex">
						<div className="grow shrink basis-0 h-48 p-4 rounded-md border border-black border-opacity-10 justify-center items-start gap-4 flex">
							<div className="w-[100px] h-[100px] justify-start items-start flex">
							<div className="w-[100px] h-[100px] relative" style={{backgroundImage: `url(/match.png)`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
							</div>
							<div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
								<div className="self-stretch text-black text-xl font-medium font-['Roboto'] leading-7">스포츠 매칭 서비스 개발</div>
								<div className="self-stretch text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight">창업</div>
								<div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">운동은 함께할 때 더 즐거우니까 Withsports</div>
								<div className="self-stretch py-1 justify-start items-center gap-1.5 inline-flex">
									<div className="w-10 h-5 px-1 py-0.5 bg-zinc-300 bg-opacity-50 rounded-sm border border-black border-opacity-10 justify-center items-center gap-0.5 flex">
										<div className="text-black text-xs font-normal font-['Roboto'] leading-none">best</div>
									</div>
								</div>
								<div className="self-stretch py-1 justify-start items-center gap-2 inline-flex">
									<div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
										<div className="w-5 h-5 relative bg-black bg-opacity-10 rounded-[20px]" />
										<div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
											<div className="self-stretch h-5 text-black text-sm font-medium font-['Roboto'] leading-tight">이정호</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
					<div className="self-stretch text-black text-[40px] font-bold font-['Arial'] leading-[48px]"> SNS형 크라우드 펀딩 </div>
					<div className="self-stretch text-black text-base font-normal font-['Arial'] leading-normal"> 프로젝트 진행상황을 뉴스피드로 확인할 수 있습니다.</div>
				</div>
			</div>
			<div className="self-stretch px-[170px] py-[60px] justify-center items-center gap-[60px] inline-flex">
				<div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
					<div className="self-stretch text-black text-[40px] font-bold font-['Arial'] leading-[48px]">사용자 Review</div>
				</div>
				<div className="grow shrink basis-0 h-[152px] justify-center items-center gap-10 flex">
					<div className="grow shrink basis-0 p-4 w-[300px] h-[200px] bg-black bg-opacity-5 rounded-md flex-col justify-center items-center gap-4 inline-flex">
						<div className="self-stretch justify-start items-center gap-1 inline-flex">
							<div className="grow shrink basis-0 h-8 justify-start items-center gap-2 flex">
							<img src="/user.png" alt="User image" className="w-8 h-8 rounded-[32px]" />
								<div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
									<div className="self-stretch h-5 text-black text-sm font-medium font-['Roboto'] leading-tight">후원자 1</div>
								</div>
							</div>
							<div className="w-[58.26px] h-[9.81px] relative" />
						</div>
						<div className="self-stretch h-[72px] text-black text-base font-normal font-['Roboto'] leading-normal">이젠 안심하고 투자할 수 있다.</div>
					</div>
					<div className="grow shrink basis-0 p-4 w-[450px] h-[200px] bg-black bg-opacity-5 rounded-md flex-col justify-center items-center gap-4 inline-flex">
						<div className="self-stretch justify-start items-center gap-1 inline-flex">
							<div className="grow shrink basis-0 h-8 justify-start items-center gap-2 flex">
							<img src="/dev.png" alt="User image" className="w-8 h-8 rounded-[32px]" />
								<div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
									<div className="self-stretch h-5 text-black text-sm font-medium font-['Roboto'] leading-tight">연구자 2</div>
								</div>
							</div>
							<div className="w-[58.26px] h-[9.81px] relative" />
						</div>
						<div className="self-stretch h-[72px] text-black text-base font-normal font-['Roboto'] leading-normal">투자자 모집이 한결 쉬워졌습니다.</div>
					</div>
				</div>
			</div>
			<div className="self-stretch px-[170px] py-[60px] justify-center items-center gap-[60px] inline-flex">
				<div className="grow shrink basis-0 h-[300px] py-5 justify-center items-start gap-10 flex">
					<div className="grow shrink basis-0 py-3 flex-col justify-center items-center gap-5 inline-flex">
						<div className="w-[100px] h-[100px] bg-black bg-opacity-5 rounded-[50px] justify-center items-center inline-flex">
							<div className="w-[100px] self-stretch text-center text-black text-[62.50px] font-normal font-['Roboto'] leading-[100px]">🎁</div>
						</div>
						<div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
							<div className="self-stretch text-center text-black text-xl font-normal font-['Roboto'] leading-7">Gifticon</div>
							<div className="self-stretch text-center text-black text-[28px] font-medium font-['Roboto'] leading-9">50종의 브랜드</div>
						</div>
					</div>
					<div className="grow shrink basis-0 py-3 flex-col justify-center items-center gap-5 inline-flex">
						<div className="w-[100px] h-[100px] bg-black bg-opacity-5 rounded-[50px] justify-center items-center inline-flex">
							<div className="w-[100px] self-stretch text-center text-black text-[62.50px] font-normal font-['Roboto'] leading-[100px]">🪙</div>
						</div>
						<div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
							<div className="self-stretch text-center text-black text-xl font-normal font-['Roboto'] leading-7">Point</div>
							<div className="self-stretch text-center text-black text-[28px] font-medium font-['Roboto'] leading-9">참여욕구 촉진</div>
						</div>

					</div>
				</div>
				<div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
					<div className="self-stretch text-black text-[40px] font-bold font-['Arial'] leading-[48px]">Other Service</div>
				</div>
			</div>
		</div>
	);
}
