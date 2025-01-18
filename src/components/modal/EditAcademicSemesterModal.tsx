import { Modal } from "antd";
import EditAcademicSemester from "../EditAcademicSemester";
import { TTableData } from "@/pages/admin/academicManagement/AcademicSemester";

export default function EditAcademicSemesterModal({
  record,
  showModal,
  setIsModalOpen,
}: {
  record: TTableData;
  showModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div>
      <Modal open={showModal} footer={null} closable={false}>
        <EditAcademicSemester
          record={record}
          setIsModalOpen={setIsModalOpen}
        ></EditAcademicSemester>
      </Modal>
    </div>
  );
}
