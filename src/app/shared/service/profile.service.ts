import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<any> {
    const apiUrl = 'http://103.13.31.37:17444/api/my/profile';
    return this.httpClient.get(apiUrl);
  }

  getTask(): Observable<any> {
    const apiUrl = 'http://103.13.31.37:17444/api/tasks';
    return this.httpClient.get(apiUrl);
  }

  getMessageTask(id: Number): Observable<any> {
    const apiUrl = `http://103.13.31.37:17444/api/tasks/${id}`;
    return this.httpClient.get(apiUrl);
  }
}
