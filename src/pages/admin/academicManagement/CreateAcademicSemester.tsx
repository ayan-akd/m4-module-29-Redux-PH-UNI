import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function CreateAcademicSemester() {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };
    return (
        <Flex justify="center" align="center">
            <Col span={6}>
        <PHForm onSubmit={onSubmit}>
            <PHInput type="text" label="Name" name="name" />
            <PHInput type="text" label="Year" name="year" />
            <PHSelect label="Select Semester" />
            <PHInput type="text" label="Start Month" name="startMonth" />
            <PHInput type="text" label="End Month" name="endMonth" />
            <Button type="primary" htmlType="submit">Submit</Button>
        </PHForm>
        </Col>
        </Flex>
    );
}