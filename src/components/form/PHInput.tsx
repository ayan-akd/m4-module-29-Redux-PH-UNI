import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "antd";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
export default function PHInput({ type, name, label }: TInputProps) {
  return (
    <div>
      {label ? <Label htmlFor={name}>{label}</Label> : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} id={name} type={type} />}
      />
    </div>
  );
}
