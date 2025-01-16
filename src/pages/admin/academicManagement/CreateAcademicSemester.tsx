import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "@/schemas/academicManagement.schema";

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
export default function CreateAcademicSemester() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = academicSemesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
