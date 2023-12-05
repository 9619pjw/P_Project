"use client";
import { Modal, Box } from "@mui/material";
import { useState } from "react";

type ModalProps = {
  children: React.ReactNode;
  show: boolean;
  setShow: (event: boolean) => void;
};

export default function ModalCustom({ children, show, setShow }: ModalProps) {
  // 부모 클래스에 추가할 것
  // 프로필 수정 모달
  // const [show, setShow] = useState(false);
  // const editProfile = () => {
  //   setShow(true);
  // }

  // 컴포넌트 추가
  // <ModalCustom show={show} setShow={setShow}></ModalCustom>

  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="edit-profile"
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "150px",
        }}
      >
        <Box style={{ margin: "30px" }}>{children}</Box>
      </div>
    </Modal>
  );
}
