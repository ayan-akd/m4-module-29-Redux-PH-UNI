import { baseApi } from "@/redux/api/baseApi";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { TQueryParams, TResponseRedux } from "@/types/global";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      providesTags: ["academic-semester"],
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic-semester"],
    }),
    updateAcademicSemester: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic-semesters/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["academic-semester"],
    }),
    deleteAcademicSemester: builder.mutation({
      query: (id) => ({
        url: `/academic-semesters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academic-semester"],
    })
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useUpdateAcademicSemesterMutation,
  useDeleteAcademicSemesterMutation,
} = academicManagementApi;
