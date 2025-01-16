import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
export default function PHInput({ type, name, label }: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} id={name} type={type} />
          </Form.Item>
        )}
      />
    </div>
  );
}
