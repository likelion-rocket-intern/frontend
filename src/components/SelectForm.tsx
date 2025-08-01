import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MypageSchemaType } from "@/sections/view/mypage-view";
import FormControl from "@mui/material/FormControl";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

interface SelectFormProps {
  values: MypageSchemaType;
  methods: UseFormReturn<MypageSchemaType>;
  title: string;
  name: "resume" | "aptitude";
  items: { id: number; title: string; created_at: string }[];
}

export default function SelectForm({
  values,
  methods,
  title,
  name,
  items,
}: SelectFormProps) {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/${name}/report/${id}`);
  };

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
            {items.map((item) => {
              const date = new Date(item.created_at);
              const formattedDate = `${date.getFullYear()}. ${String(
                date.getMonth() + 1
              ).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
              return (
                <Label
                  key={item.id}
                  className={clsx(
                    "flex items-center justify-between px-4 py-6 rounded-2xl",
                    field.value === item.id
                      ? "ring ring-gray-400 shadow-[0_4px_6px_0_rgba(0,0,0,0.09)]"
                      : ""
                  )}
                >
                  <div className="flex items-center gap-4 py-4">
                    <FormItem>
                      <FormControl>
                        <Input
                          type="radio"
                          value={item.id}
                          checked={field.value === item.id}
                          onChange={() => field.onChange(item.id)}
                          className="size-4 peer"
                        />
                      </FormControl>
                    </FormItem>
                    <div>
                      <p className="subtitle_1 text-[#767676]">{item.title}</p>
                      <p className="label_1 text-[#D9D9D9]">
                        분석 완료 {formattedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col self-stretch justify-between items-end gap-4">
                    <SvgColor
                      src="/icons/icon-more-vertical.svg"
                      className="text-[#767676]"
                    />
                    <Button
                      variant={"outline_primary"}
                      type="button"
                      onClick={() => handleNavigate(item.id)}
                    >
                      분석 결과 보기
                    </Button>
                  </div>
                </Label>
              );
            })}
          </div>
        )}
      />

      {/* 밑에서부터 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
