import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface SplitCardProps {
  cardTitle: string;
  cardDescription: React.ReactNode;
  cardActionText: string;
  cardAction: () => void;
}

export default function SplitCard({
  cardTitle,
  cardDescription,
  cardActionText,
  cardAction,
}: SplitCardProps) {
  return (
    <Card className="flex flex-col justify-end w-[588px] h-[632px] px-[78px] py-[60px] bg-[#D9D9D9]">
      <CardHeader className="w-[340px] mb-[42px]">
        <CardTitle className="text-[40px] font-semibold leading-[1.4] tracking-[-1px] mb-5">
          {cardTitle}
        </CardTitle>
        <CardDescription className="body_1">{cardDescription}</CardDescription>
      </CardHeader>
      <Button
        className="py-5 text-[24px] font-semibold leading-[32px] tracking-[-0.144px] cursor-pointer"
        onClick={cardAction}
      >
        {cardActionText}
      </Button>
    </Card>
  );
}
