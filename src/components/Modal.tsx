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
import clsx from "clsx";
import { TASK_STATUS_MESSAGE } from "@/constants/taskStatus";
import { Button } from "@/components/ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  image: React.ReactNode;
  handleFileUpload: () => void;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  image,
  handleFileUpload,
}: ModalProps) {
  // 이력서 분석 실패시 이력서 재업로드
  const handleReupload = () => {
    onClose();
    handleFileUpload();
  };

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
                <div className="flex justify-center items-center mb-4">{image}</div>
                {/* 타이틀 */}
                <div className="flex flex-col justify-between items-center mb-4">
                  <DialogTitle
                    className={clsx(
                      "title_1 mb-[26px]",
                      title === TASK_STATUS_MESSAGE.failed
                        ? "text-error-500"
                        : "text-gray-600"
                    )}
                  >
                    {title}
                  </DialogTitle>
                  {title === TASK_STATUS_MESSAGE.failed && (
                    <div className="flex gap-6">
                      <Button
                        className="w-[240px] h-12"
                        variant={"outline_primary"}
                      >
                        홈으로 가기
                      </Button>
                      <Button
                        className="w-[240px] h-12"
                        variant={"default_primary"}
                        onClick={() => handleReupload()}
                      >
                        새 이력서 업로드하기
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
