import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "@/schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "@/redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "@/types/global";

const academicSemesterOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: (currentYear + number).toString(),
  label: (currentYear + number).toString(),
}));
const monthOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];
export default function CreateAcademicSemester({ handleOk, refetch }: { handleOk: () => void; refetch: () => void }) {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Semester....");
    const name = academicSemesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await addAcademicSemester(semesterData) as TResponse<any>;
      if (res) {
        toast.success("Academic Semester Created Successfully", {
          id: toastId,
        });
        refetch();
      }
      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
      });
      console.log(err);
    }
  };

  return (
    <Flex  align="center">
      <Col span={24}>
      <h1 className="text-center font-bold mb-5 text-xl">Create New Semester</h1>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Select Semester"
            name="name"
            options={academicSemesterOptions}
          />
          <PHSelect label="Select Year" name="year" options={yearOptions} />
          <PHSelect
            label="Select Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect
            label="Select End Month"
            name="endMonth"
            options={monthOptions}
          />
          <div className="flex justify-center">
          <Button onClick={handleOk} type="primary" htmlType="submit">
            Submit
          </Button>
          </div>
        </PHForm>
      </Col>
    </Flex>
  );
}