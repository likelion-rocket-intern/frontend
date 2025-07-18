import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MypageSchemaType } from "@/sections/view/mypage-view";
import FormControl from "@mui/material/FormControl";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";

interface SelectFormProps {
  values: MypageSchemaType;
  methods: UseFormReturn<MypageSchemaType>;
  title: string;
  itemTitle: string;
  name: "resume" | "aptitude";
}

export default function SelectForm({
  values,
  methods,
  title,
  itemTitle,
  name,
}: SelectFormProps) {
  return (
    <section className="relative flex-1 flex flex-col gap-4">
      <div className="flex justify-between border-b-2 border-[#D9D9D9] pb-4 px-2">
        <h2 className="subtitle_1 text-[#777777]">{title}</h2>
        {values[name] !== undefined && (
          <span className="body_2 text-gray-500">선택 완료</span>
        )}
      </div>
      <FormField
        control={methods.control}
        name={name}
        render={({ field, fieldState }) => (
          <div
            className={clsx(
              "space-y-4 h-[470px] overflow-y-scroll px-4 py-2 rounded-2xl",
              fieldState.invalid && "border border-error-500 bg-error-50"
            )}
          >
            {/* 이력서 아이템 */}
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <Label
                key={idx}
                className={clsx(
                  "flex items-center justify-between px-4 py-6 rounded-2xl",
                  field.value === idx
                    ? "ring ring-gray-400 shadow-[0_4px_6px_0_rgba(0,0,0,0.09)]"
                    : ""
                )}
              >
                <div className="flex items-center gap-4 py-4">
                  <FormItem>
                    <FormControl>
                      <Input
                        type="radio"
                        value={idx}
                        checked={field.value === idx}
                        onChange={() => field.onChange(idx)}
                        className="size-4 peer"
                      />
                    </FormControl>
                  </FormItem>
                  <div>
                    <p className="subtitle_1 text-[#767676]">{itemTitle}</p>
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
                  <Button variant={"outline_primary"}>결과불러오기</Button>
                </div>
              </Label>
            ))}
          </div>
        )}
      />

      {/* 밑에서부터 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
