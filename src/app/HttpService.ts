import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { environment } from "src/environments/environment"; // uncomment if using environment files

@Injectable({ providedIn: "root" })
export class HttpService {
  private baseUrl = "https://todo-list-backend-93im.onrender.com/activities/";

  constructor(private http: HttpClient) {}

  getActivities() {
    return this.http.get(this.baseUrl);
  }

  postActivity(activityName: string, activityCompleted: boolean) {
    return this.http.post(this.baseUrl, {
      name: activityName,
      completed: activityCompleted,
    });
  }

  deleteActivity(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
