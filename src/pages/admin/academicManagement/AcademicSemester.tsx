import { useGetAllSemestersQuery } from "@/redux/features/academicSemester/AcademicSemesterApi";


export default function AcademicSemester() {

    const { data, isLoading } = useGetAllSemestersQuery(undefined);
    if(!isLoading) {
        console.log(data);
    }
    return (
        <div>
            <h1>This is the AcademicSemester component</h1>
        </div>
    );
}