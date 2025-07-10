"use client";

import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { FormProvider, useForm } from "react-hook-form";

export default function MypageView() {
  const methods = useForm();
  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();

  return (
    <>
      <div className="bg-[#F5F5F5] flex items-center justify-center px-8 py-6 rounded-2xl space-x-6 mb-20">
        <div className="size-[112px] bg-white rounded-full"></div>
        <section className="flex flex-col gap-2 w-[318px]">
          <span className="text-[28px] font-medium leading-[140%] tracking-[-0.7px] not-italic">
            이능력
          </span>
          <span className="body_1 text-stone-600">dlsmdfur34@naver.com</span>
          <div className="flex items-center">
            <Button
              variant={"ghost"}
              className="px-4 py-2 text-[#767676] caption_1"
            >
              로그아웃
            </Button>
            <div className="w-[1px] h-6 bg-[#D9D9D9] mx-4"></div>
            <Button
              variant={"ghost"}
              className="px-4 py-2 text-[#767676] caption_1"
            >
              회원탈퇴
            </Button>
          </div>
        </section>
        <div className="w-0.5 h-[106px] bg-[#AFAFAF]"></div>
        <section className="w-[180px] flex flex-col gap-2 items-center">
          <span className="subtitle_1 text-[#767676]">이력서</span>
          <span className="title_1 text-[#525252]">0건</span>
        </section>
        <div className="w-0.5 h-[106px] bg-[#AFAFAF]"></div>
        <section className="w-[180px] flex flex-col gap-2 items-center">
          <span className="subtitle_1 text-[#767676]">적성검사</span>
          <span className="title_1 text-[#525252]">0건</span>
        </section>
      </div>

      {/* 이력서, 적성검사 섹션 */}
      <div className="flex gap-8 mb-[72px]">
        <FormProvider {...methods}>
          {/* 이력서 목록 */}
          <section className="relative flex-1 flex flex-col gap-4">
            <div className="border-b-2 border-[#D9D9D9] pb-4">
              <h2 className="title_1 text-[#777777]">이력서 목록</h2>
            </div>
            <div className="space-y-4 h-[470px] overflow-y-scroll px-4 py-2">
              {/* 이력서 아이템 */}
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <FormField
                  key={idx}
                  control={methods.control}
                  name="resume"
                  render={({ field }) => (
                    <div
                      className={clsx(
                        "flex items-center justify-between px-4 py-6 rounded-2xl",
                        field.value === idx ? "ring ring-[#A3A3A3]" : ""
                      )}
                    >
                      <div className="flex items-center gap-4 py-4">
                        <FormItem>
                          <FormControl>
                            <Input
                              type="radio"
                              id={`resume-${idx}`}
                              value={idx}
                              checked={field.value === idx}
                              onChange={() => field.onChange(idx)}
                              className="size-4 peer"
                            />
                          </FormControl>
                        </FormItem>
                        <div>
                          <p className="subtitle_1 text-[#767676]">
                            000이력서입니다.(이력서제목)
                          </p>
                          <p className="label_1 text-[#D9D9D9]">
                            분석 완료 2025.07.07
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col self-stretch justify-between items-end gap-4">
                        <SvgColor
                          src="/icons/icon-more-vertical.svg"
                          className="text-[#767676]"
                        />
                        <Button className="px-4 py-2 caption_1 rounded-[6px]">
                          결과보기
                        </Button>
                      </div>
                    </div>
                  )}
                />
              ))}
            </div>
            {/* 밑에서부터 그라데이션 */}
            <div className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none bg-gradient-to-t from-white to-transparent" />
          </section>

          {/* 적성검사 목록 */}
          <section className="relative flex-1 flex flex-col gap-4">
            <div className="border-b-2 border-[#D9D9D9] pb-4">
              <h2 className="title_1 text-[#777777]">적성검사 목록</h2>
            </div>
            <div className="space-y-4 h-[470px] overflow-y-scroll px-4 py-2">
              {/* 적성검사 아이템 */}
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <FormField
                  key={idx}
                  control={methods.control}
                  name="aptitude"
                  render={({ field }) => (
                    <div
                      className={clsx(
                        "flex items-center justify-between px-4 py-6 rounded-2xl",
                        field.value === idx ? "ring ring-[#A3A3A3]" : ""
                      )}
                    >
                      <div className="flex items-center gap-4 py-4">
                        <FormItem>
                          <FormControl>
                            <Input
                              type="radio"
                              id={`aptitude-${idx}`}
                              value={idx}
                              checked={field.value === idx}
                              onChange={() => field.onChange(idx)}
                              className="size-4 peer"
                            />
                          </FormControl>
                        </FormItem>
                        <div>
                          <p className="subtitle_1 text-[#767676]">적성검사</p>
                          <p className="label_1 text-[#D9D9D9]">
                            분석 완료 2025.07.07
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col self-stretch justify-between items-end gap-4">
                        <SvgColor
                          src="/icons/icon-more-vertical.svg"
                          className="text-[#767676]"
                        />
                        <Button className="px-4 py-2 caption_1 rounded-[6px]">
                          결과보기
                        </Button>
                      </div>
                    </div>
                  )}
                />
              ))}
            </div>
            {/* 밑에서부터 그라데이션 */}
            <div className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none bg-gradient-to-t from-white to-transparent" />
          </section>
        </FormProvider>
      </div>

      <section className="space-y-6">
        {/* 헤더 */}
        <header className="flex justify-between items-center">
          <div>
            <h2 className="title_1 text-[#767676] mb-2">종합결과</h2>
            <p className="text-[#A3A3A3] body_2">
              이력서와 적성검사 목록에서 항목을 하나씩 선택해 주세요
            </p>
          </div>
          <Button className="px-4 py-2 rounded-md caption_1">
            종합결과보기
          </Button>
        </header>

        {/* 결과 박스 */}
        <article className="bg-[#F8F8F8] w-full h-[175px] rounded-2xl"></article>
      </section>
    </>
  );
}
