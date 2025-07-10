"use client";

import { z as zod } from "zod";
import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Span } from "next/dist/trace";
import SelectForm from "@/components/SelectForm";

export type MypageSchemaType = zod.infer<typeof MypageSchema>;

const MypageSchema = zod.object({
  resume: zod.number(),
  aptitude: zod.number(),
});

export default function MypageView() {
  const methods = useForm<MypageSchemaType>({
    resolver: zodResolver(MypageSchema),
  });
  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();

  console.log(errors);
  const onSubmit = (formData: MypageSchemaType) => {
    console.log(formData);
  };

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

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-8 mb-[72px]">
            {/* 이력서 목록 */}
            <SelectForm
              title="이력서 목록"
              name="resume"
              values={values}
              methods={methods}
            />

            {/* 적성검사 목록 */}
            <SelectForm
              title="적성검사 목록"
              name="aptitude"
              values={values}
              methods={methods}
            />
          </div>

          <section className="space-y-6">
            {/* 헤더 */}
            <header className="flex justify-between items-center">
              <div>
                <h2 className="title_1 text-[#767676] mb-2">종합결과</h2>
              </div>
              <Button
                type="submit"
                className="px-4 py-2 rounded-md caption_1 bg-primary-500"
              >
                종합결과보기
              </Button>
            </header>

            {/* 결과 박스 */}
            <article className="bg-[#F8F8F8] flex justify-center items-center w-full h-[175px] rounded-2xl">
              <p
                className={clsx(
                  "text-[#A3A3A3] body_2",
                  (errors.resume || errors.aptitude) && "text-error-500"
                )}
              >
                이력서와 적성검사 목록에서 항목을 하나씩 선택해 주세요
              </p>
            </article>
          </section>
        </form>
      </FormProvider>
    </>
  );
}
