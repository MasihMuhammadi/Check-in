import axios from 'axios';

const baseUrl = 'http://localhost:5000';

// Interface for AddClass payload
// export interface AddClassPayload {
//     class_name: string;
//     course_name: string;
//     teacher: string;
//     duration: string;
//     start_day: string;
//     finish_day: string;
//     started_time: string;
//     finish_time: string;
// }

// Add Class API request
export const createaCourse = async (payload: any) => {
    try {
        const response = await axios.post(`${baseUrl}/api/courses/course`, payload);
        // api/courses/course
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createTeacher = async (payload: any) => {
    try {
        const response = await axios.post(`${baseUrl}/api/teachers/teacher`, payload);
        // api/courses/course
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const addClass = async (payload: any) => {
    try {
        const response = await axios.post(`${baseUrl}/api/classes/class`, payload, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const loginAsTeacher = async (payload: any) => {
    try {
        const response = await axios.post(`${baseUrl}/api/auth/login`, payload, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const loginAsManager = async (payload: any) => {
    try {
        const response = await axios.post(`${baseUrl}/api/auth/login`, payload, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getSingleTeacherData = async (handle: any) => {
    try {
        const response = await axios.get(`${baseUrl}/api/teachers/handle-teacher/${handle}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const getSingleTeacherData = axios.post(`${baseUrl}/api/teachers/teacher/:handle`,handle)


// Example of another API request (e.g., fetch classes)
// export const fetchClasses = async () => {
//   try {
//     const response = await axios.get(`${baseUrl}/api/class/get-classes`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Example of another API request (e.g., delete class)
// export const deleteClass = async (classId: string) => {
//   try {
//     const response = await axios.delete(`${baseUrl}/api/class/delete-class/${classId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
