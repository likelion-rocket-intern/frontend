"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { SvgColor } from "@/components/svg-color";
import { useRef, useState } from "react";

export default function ResumeUploadView() {
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 input 참조
  const [additional, setAdditional] = useState<string>(""); // 추가 정보 input 상태관리
  const withoutSpaces = additional.replace(/\s/g, ""); // 공백 제거
  const [manualResume, setManualResume] = useState<string>(""); // 이력서 직접 작성 input
  const withoutSpacesManual = manualResume.replace(/\s/g, ""); // 직접 작성란 공백 제거

  // 파일 input 클릭
  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {/* 이력서 작성 방식 선택 탭 */}
      <Tabs defaultValue="upload" className="flex w-full mb-24">
        <TabsList className="self-end mb-20">
          <TabsTrigger value="upload">이력서 파일 업로드하기</TabsTrigger>
          <TabsTrigger value="manual">새 이력서 작성하기</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          {/* 이력서 업로드 섹션 */}
          <article className="mb-20">
            <div className="flex justify-between mb-8">
              <h1 className="text-[32px] text-[#777777]">
                이력서를 업로드해주세요
              </h1>
              <Button
                type="button"
                onClick={() => handleFileSelectClick()}
                className="py-2 px-4 leading-none h-[38px]"
              >
                파일 선택
              </Button>
            </div>

            <Input
              type="file"
              id="resumeUpload"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              ref={fileInputRef}
            />
            <Label htmlFor="resumeUpload" className="block w-full">
              <div className="flex flex-col justify-center items-center bg-[#F8F8F8] border border-[#CAC8C8] rounded-[10px] h-[138px] text-[#767676] space-y-[6px] mb-[10px]">
                <div className="flex gap-[6px] items-center">
                  <p className="text-[22px]">드래그해서 업로드</p>
                  <SvgColor src="/icons/icon-upload.svg" />
                </div>
                <p>지원 가능한 파일 형식 안내: PDF, DOC, DOCX, TXT 등</p>
              </div>
            </Label>
            <p className="text-right text-xs text-[#767676]">
              최대 5mb 까지 업로드 가능합니다.
            </p>
          </article>

          {/* 추가 내용 작성 섹션 */}
          <article className="space-y-8">
            <h1 className="text-[32px] text-[#777777]">
              추가 내용을 작성해주세요
            </h1>
            <div>
              <Textarea
                className="min-h-[268px] mb-2"
                onChange={(e) => setAdditional(e.target.value)}
                value={additional}
              />
              <p className="text-right text-xs text-[#767676]">{`총 글자수 ${additional.length}자 / 공백제외 ${withoutSpaces.length}자`}</p>
            </div>
          </article>
        </TabsContent>
        <TabsContent value="manual">
          <article className="space-y-8">
            <h1 className="text-[32px] text-[#777777]">
              이력서를 작성해주세요
            </h1>
            <div>
              <Textarea
                className="min-h-[268px] mb-2"
                onChange={(e) => setManualResume(e.target.value)}
                value={manualResume}
              />
              <p className="text-right text-xs text-[#767676]">{`총 글자수 ${manualResume.length}자 / 공백제외 ${withoutSpacesManual.length}자`}</p>
            </div>
          </article>
        </TabsContent>
      </Tabs>

      <section className="flex w-full justify-around space-x-6 *:flex-1 *:py-5 *:px-4 *:rounded-[6px] *:text-2xl">
        <Button variant={"white"}>임시저장</Button>
        <Button>저장하기</Button>
        <Button>이력서 분석하기</Button>
      </section>
    </div>
  );
}
