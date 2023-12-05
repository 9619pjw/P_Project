"use client";
import ImageTag from "next/image";
import { useDropzone } from "react-dropzone";

type InsertProfileImage = {
    profileImage: string | null;
    setProfileImage: (profileImage: string) => void;
    profileImageFile: File | undefined;
    setProfileImageFile: (profileImageFile: File) => void;
}

export default function InsertProfileImage({profileImage, setProfileImage, profileImageFile, setProfileImageFile}: InsertProfileImage) {
    // 팀 이미지 미리보기
    let width = 200;
    let height = 200;

    // 이미지 파일을 dropzone에 드롭하면 onDrop 함수 실행
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    function onDrop(acceptedFiles: any) {
        const reader = new FileReader();
        const file = acceptedFiles[0];

        // 이미지 파일을 읽어 setImage로 저장
        if(file){
            reader.readAsDataURL(file);
            setProfileImage(file);
        }

        // onDrop되면 preview를 보여줌, 기존 이미지 url을 지움
        reader.onload = () => {
            const img: HTMLImageElement = new Image();
            img.src = reader.result as string;
            img.onload = () => {
                setProfileImage(reader.result as string);
                const elem = document.createElement('canvas');
                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                if (ctx !== null) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const ext = file.name.split('.').pop();
                    let type = 'image/jpeg'; // default to jpeg
    
                    if (ext === 'png') {
                        type = 'image/png';
                    } else if (ext === 'jpg' || ext === 'jpeg') {
                        type = 'image/jpeg';
                    }
                    // else if (ext === 'gif') { type = 'image/gif'; } // add more if needed
    
                    ctx.canvas.toBlob((blob) => {
                        if (blob !== null) {
                        const resizedFile = new File([blob], `${file.name}.${ext}`, {type: type, lastModified: Date.now()});
                        // save the file...
                        console.log("resizedFile: ");
                        console.log(resizedFile);
                        setProfileImageFile(resizedFile);
                        }
                    }, type, 1);
                }
            };
            (document.getElementsByName("imageURL")[0] as HTMLInputElement).value = "";
        };
    }

    return(
        <div className="img_wrap" {...getRootProps()}>
            <ImageTag src={profileImage? profileImage : "/default-profile.png"} alt="팀 이미지" width={width} height={height}/>
            <input {...getInputProps()} multiple={false} name="imageURL"/>
        </div>
    )
}