import axios from "axios";

class Interceptor {

	public create() {

        axios.interceptors.request.use(request => {
            const token = localStorage.getItem("token");
            if(token) request.headers.Authorization = "Bearer " + token;
            return request;
        });

    }

}

export const interceptor = new Interceptor();
