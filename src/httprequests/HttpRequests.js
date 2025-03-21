import apiClient from "../components/apiClient";


class HttpRequest {
    getStatuses(){
        return apiClient.get('/statuses');
    }
    getPriorities(){
        return apiClient.get('/priorities');
    }
    getDepartments(){
        return apiClient.get('/departments');
    }
    getEmployees(){
        return apiClient.get('/employees');
    }
    getAllTasks(){
        return apiClient.get('/tasks')
    }
    getTask(id){
        return apiClient.get(`/tasks/${id}`)
    }
    getAllComments(id){
        return apiClient.get(`/tasks/${id}/comments`)
    }
    
}

export default new HttpRequest();