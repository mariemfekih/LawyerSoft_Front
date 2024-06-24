import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  sendEmailTemplate(to: string, subject: string, templatePath: string, idUser: number): Observable<any> {
    const url = `${this.host}/mail/sendTemplate/${idUser}`;
    
    // Construct the query parameters
    const params = new HttpParams()
      .set('to', to)
      .set('subject', subject)
      .set('templatePath', templatePath);

    // Make the POST request with the parameters
    return this.http.post(url, null, { params, responseType: 'text' });
    // Use responseType 'text' because the response is plain text
  }
  sendEmailTemplateWithoutId(to: string, subject: string, templatePath: string, firstName: string, lastName: string,idUser: number): Observable<any> {
    const url = `${this.host}/mail/sendTemplate/id/${idUser}`;
    const params = new HttpParams()
      .set('to', to)
      .set('subject', subject)
      .set('templatePath', templatePath)
      .set('firstName', firstName)
      .set('lastName', lastName);
  
    console.log(`Sending email with params: to=${to}, subject=${subject}, templatePath=${templatePath}, firstName=${firstName}, lastName=${lastName}`);
    return this.http.post(url, null, { params });
  }
  
  
}
