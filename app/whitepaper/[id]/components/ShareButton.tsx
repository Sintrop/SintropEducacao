"use client";

import { toast, ToastContainer } from "react-toastify";

export function ShareButton() {
  return (
    <>
      <button
        className="font-bold text-white px-5 w-fit h-10 flex items-center justify-center rounded-md border border-white mt-5 gap-2"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Link copiado para área de transferência!");
        }}
      >
        Compartilhar whitepaper
      </button>

      <ToastContainer />
    </>
  );
}
