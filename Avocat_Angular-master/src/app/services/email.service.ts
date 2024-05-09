import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private host = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  sendMail(
    //file: File[], 
    to: string, cc: string[], subject: string, body: string): Observable<string> {
    const formData = new FormData();
    formData.append('to', to || 'mariembf6@gmail.com'); // Use a placeholder email address
    formData.append('cc', (cc && cc.length > 0) ? cc.join(',') : ''); // Provide an empty string if cc is null or empty
    formData.append('subject', subject);
    formData.append('body', body);
   /* if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i]);
      }
    }*/
    return this.http.post<string>(`${this.host}/mail/send`, formData);
  }
 /* sendMail(files: File[], to: string, cc: string[], subject: string, body: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('body', body);
    if (cc) {
      formData.append('cc', JSON.stringify(cc));
    }
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<string>(this.baseUrl, formData, { headers: headers });
  }*/
}
