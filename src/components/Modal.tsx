"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  image: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, image }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* 배경 */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        {/* 모달 배경 */}
        <div className="fixed inset-0 flex items-center justify-center w-full">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* 모달 박스 */}
            <DialogPanel className="relative w-[900px] transform rounded-[20px] bg-white p-5 transition-all">
              <button
                onClick={onClose}
                className="absolute text-gray-400 hover:text-gray-600 top-5 right-5 cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-8 items-center mx-[156px] my-[146px] w-[588px] h-[308px]">
                <div className="size-[236px] bg-gray-300">{image}</div>
                {/* 타이틀 */}
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle className="title_1 text-gray-600">
                    {title}
                  </DialogTitle>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
