import apiClient from "../components/ApiClient";

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
}

export default new HttpRequest();