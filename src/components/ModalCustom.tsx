"use client";
import { Modal, Box } from "@mui/material";
import { useState } from "react";

type ModalProps = {
  children: React.ReactNode;
  show: boolean;
  setShow: (event: boolean) => void;
};

export default function ModalCustom({ children, show, setShow }: ModalProps) {

  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <div className="edit-profile bg-white flex justify-center items-center m-24">
        <Box className="m-6">{children}</Box>
    </div>
    </Modal>
  );
}
