import { apiSlice } from "../api/apiSilce";  // Kiểm tra tên import đúng

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({  // Truyền trực tiếp data thay vì { data }
        url: "create-course",
        method: "POST",
        body: data,  // Gửi dữ liệu trực tiếp
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({  // Truyền trực tiếp data thay vì { data }
        url: "get-admin-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourses: builder.mutation({
      query: (id) => ({
        url:`delete-course/${id}`,
        method: "PUT",
        credentials: "include" as const, // Đảm bảo gửi cookie cùng request
      }),
    }),
    editCourses: builder.mutation({
      query: ({id,data}) => ({
        url:`edit-course/${id}`,
        method: "PUT",
        body:data,
        credentials: "include" as const, // Đảm bảo gửi cookie cùng request
      }),
    }),
    getUserAllCourses: builder.query({
      query: () => ({  // Truyền trực tiếp data thay vì { data }
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCoursesDetails: builder.query({
      query: (id) => ({  // Truyền trực tiếp data thay vì { data }
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
  
});

export const { useCreateCourseMutation , useGetAllCoursesQuery, useDeleteCoursesMutation, useEditCoursesMutation ,
  useGetUserAllCoursesQuery ,useGetCoursesDetailsQuery} = courseApi;
