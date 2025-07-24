import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";

interface SplitCardProps {
  cardTitle: string;
  cardDescription: React.ReactNode;
  cardActionText: string;
  cardAction: () => void;
  cardIconSrc: string; // Optional icon source
}

export default function SplitCard({
  cardTitle,
  cardDescription,
  cardActionText,
  cardAction,
  cardIconSrc,
}: SplitCardProps) {
  return (
    <Card className="relative flex flex-col items-center justify-end w-[588px] h-[632px] px-[78px] py-[60px] bg-white border border-orange-500 shadow-lg overflow-hidden">
      {/* 아이콘 아래쪽 사각형 배경 */}
      <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-[#FFF8F3] via-[#FFF8F3] to-transparent opacity-95"></div>

      {cardIconSrc && (
        <div className="relative mb-12 z-10">
          <Image src={cardIconSrc} alt={cardTitle} width={240} height={240} />
        </div>
      )}

      <CardHeader className="relative z-10 w-[340px] mb-[42px]">
        <CardTitle className="text-[40px] font-semibold leading-[1.4] tracking-[-1px] mb-5 text-[#505050]">
          {cardTitle}
        </CardTitle>
        <CardDescription className="body_1 text-[#767676]">
          {cardDescription}
        </CardDescription>
      </CardHeader>
      <Button
        variant={"default_primary"}
        size={"large"}
        onClick={cardAction}
        className="relative z-10"
      >
        {cardActionText}
      </Button>
    </Card>
  );
}
