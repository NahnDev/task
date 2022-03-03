import { DataMembers, DataProject, DataSubtasks, DataTasks } from '../types/api';
import { Project } from '../types/global';
import axiosClient from './axiosClient';

const projectsApi = {
    // Subtask
    postSubtasks: (_pid: string, _id: string, data: DataSubtasks) => {
        const url = `/projects/${_pid}/tasks/${_id}/subtasks`;
        return axiosClient.post(url, data);
    },

    // Task
    getTasks: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks`;
        return axiosClient.get(url);
    },

    getTasksDetail: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks/${_id}`;
        return axiosClient.get(url);
    },

    postTasks: (_pid: string, data: DataTasks) => {
        const url = `/projects/${_pid}/tasks`;
        return axiosClient.post(url, data);
    },

    patchTasks: (_pid: string, _id: string, data: DataTasks) => {
        const url = `/projects/${_pid}/tasks/${_id}`;
        return axiosClient.patch(url, data);
    },

    deleteTasks: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks/${_id}`;
        return axiosClient.delete(url);
    },

    // Member
    getMembers: (_pid: string) => {
        const url = `/projects/${_pid}/members`;
        return axiosClient.get(url);
    },

    postMembers: (_pid: string, data: DataMembers) => {
        const url = `/projects/${_pid}/members`;
        return axiosClient.post(url, data);
    },

    patchMembers: (_pid: string, _userId: string, data: DataMembers) => {
        const url = `/projects/${_pid}/members/${_userId}`;
        return axiosClient.patch(url, data);
    },

    deleteMembers: (_pid: string, _userId: string) => {
        const url = `/projects/${_pid}/members/${_userId}`;
        return axiosClient.delete(url);
    },

    // Projects
    getProjects: (): Promise<Project[]> => {
        const url = `/projects`;
        return axiosClient.get<any, Array<Project>>(url);
    },

    getProjectsDetail: (_pid: string) => {
        const url = `/projects/${_pid}`;
        return axiosClient.get(url);
    },

    postProjects: (data: DataProject) => {
        const url = `/projects`;
        return axiosClient.post(url, data);
    },

    patchProjects: (_pid: string, data: DataProject) => {
        const url = `/projects/${_pid}`;
        return axiosClient.patch(url, data);
    },

    deleteProjects: (_pid: string) => {
        const url = `/projects/${_pid}`;
        return axiosClient.delete(url);
    },
};
export default projectsApi;
