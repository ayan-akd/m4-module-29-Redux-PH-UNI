import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { TQueryParams } from "@/types";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import CreateAcademicSemester from "./CreateAcademicSemester";

export type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

export default function AcademicSemester() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: semesterData, isFetching, refetch } = useGetAllSemestersQuery(params);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };


  const tableData = semesterData?.data?.map((semester) => ({
    key: semester._id,
    _id: semester._id,
    name: semester.name,
    year: semester.year,
    startMonth: semester.startMonth,
    endMonth: semester.endMonth,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
        {
          text: "2029",
          value: "2029",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div className="flex gap-2">
            <Button type="primary">Edit</Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button onClick={showModal} type="primary">Add Semester</Button>
      </div>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Modal open={isModalOpen} footer={null}>
        <CreateAcademicSemester handleOk={handleOk} refetch={refetch}></CreateAcademicSemester>
      </Modal>
    </div>
  );
}
