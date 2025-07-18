"use client";

import { z as zod } from "zod";
import { Button } from "@/components/ui/button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectForm from "@/components/SelectForm";
import { Input } from "@/components/ui/input";
import { SvgColor } from "@/components/svg-color";

export type MypageSchemaType = zod.infer<typeof MypageSchema>;

const MypageSchema = zod.object({
  link: zod.string(),
  resume: zod.number(),
  aptitude: zod.number(),
});

export default function MypageView() {
  const methods = useForm<MypageSchemaType>({
    resolver: zodResolver(MypageSchema),
  });
  const {
    watch,
    control,
    formState: { errors },
  } = methods;
  const values = watch();

  console.log(errors);
  const onSubmit = (formData: MypageSchemaType) => {
    console.log(formData);
  };

  return (
    <div className="space-y-20">
      {/* 프로필 섹션 */}
      <div className="bg-[#F5F5F5] flex items-center justify-center px-8 py-6 rounded-2xl space-x-6 mb-20 text-gray-500">
        <div className="size-[112px] bg-white rounded-full"></div>
        <section className="flex flex-col gap-2 w-[318px]">
          <span className="title_1">이능력</span>
          <span className="body_2">dlsmdfur34@naver.com</span>
          <div className="flex items-center text-gray-400">
            <Button variant={"link_default"} className="px-4 py-2 caption_1">
              로그아웃
            </Button>
            <div className="w-[1px] h-6 bg-[#D9D9D9] mx-4"></div>
            <Button variant={"link_default"} className="px-4 py-2 caption_1">
              회원탈퇴
            </Button>
          </div>
        </section>
        <div className="w-0.5 h-[106px] bg-gray-200"></div>
        <section className="w-[180px] flex flex-col gap-2 items-center">
          <span className="body_1">이력서</span>
          <span className="subtitle_1">0건</span>
        </section>
        <div className="w-0.5 h-[106px] bg-gray-200"></div>
        <section className="w-[180px] flex flex-col gap-2 items-center">
          <span className="body_1">적성검사</span>
          <span className="subtitle_1">0건</span>
        </section>
      </div>

      {/* 종합결과 섹션 */}
      <section className="space-y-[54px]">
        <h2 className="title_1 text-[#767676]">종합결과</h2>
        <div className="flex flex-col items-center justify-center bg-[url('/images/match_keywords.png')] h-[588px] bg-contain bg-no-repeat bg-center">
          <div className="w-[384px]">
            <h2 className="title_2 text-gray-600 mb-8 text-center">
              기업과 나의 핵심 키워드 찾기
            </h2>
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <div className="ring ring-primary-400 bg-white px-4 py-2 rounded-[10px] flex items-center mb-2">
                  <SvgColor
                    src="/icons/icon-link.svg"
                    width={24}
                    height={24}
                    className="text-gray-400"
                  />
                  <Input
                    value={field.value}
                    className="focus-visible:border-none focus-visible:ring-0 border-none body_2 placeholder:body_2 placeholder:text-gray-400"
                    placeholder="채용공고 링크 입력"
                  />
                </div>
              )}
            />
            <p className="body_2 text-gray-400 mb-8">
              링크를 입력하고 이력서와 적성검사를 선택해 주세요
            </p>
            <Button
              variant={"default_primary"}
              size={"large"}
              className="w-full"
            >
              <div className="flex items-center">
                <p>채용공고와 비교하기</p>
                <SvgColor src="/icons/icon-search.svg" width={32} height={32} />
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* 이력서, 적성검사 섹션 */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-8 mb-[72px]">
            {/* 이력서 목록 */}
            <SelectForm
              title="이력서 목록"
              itemTitle="000 이력서입니다."
              name="resume"
              values={values}
              methods={methods}
            />

            {/* 적성검사 목록 */}
            <SelectForm
              title="적성검사 목록"
              itemTitle="적성검사"
              name="aptitude"
              values={values}
              methods={methods}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
