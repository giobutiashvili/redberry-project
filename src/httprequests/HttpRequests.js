import apiClient from "../components/ApiClient";
import task from "../components/taskDetail.vue"

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
    getAllComments() {
        if (!task.value || !task.value.id) {
            console.error("Task is not loaded yet");
            return;
        }
        return apiClient.get(`/tasks/${task.value.id}/comments`);
    }
}

export default new HttpRequest();