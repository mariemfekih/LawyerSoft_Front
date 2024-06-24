import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Folder } from '../models/folder';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addFolder(customerId: number): Observable<string> {
    const url = `${this.host}/Folder/${customerId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, {}, { headers, responseType: 'text' });
  }

    deleteFolder(path: string): Observable<void> {
      return this.http.delete<void>(`${this.host}/Folder/${path}`);
    }
  
  
  updateFolder(path: string, newName: string): Observable<Folder> {
    const url = `${this.host}/Folder/${path}/updateFileName/${newName}`
    return this.http.put<Folder>(url, { path, name: newName })
  }

  getFolderById(idFolder: number): Observable<Folder> {
    const url = `${this.host}/Folder/${idFolder}`;
    return this.http.get<Folder>(url);
  }
  //get folders of a user
  getFolders(id:number): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.host}/Folder/user/${id}`);
  } 
  
  checkFolderName(name: string, caseId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.host}/check-name/${caseId}/${name}`);
  }
    

  addSubFolder(parentFolderId: number, caseId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { parentFolderId, caseId };
    return this.http.post(`${this.host}/Folder/addSubfolder/${parentFolderId}/${caseId}`, body, { headers })
      .pipe(
        tap((subFolder: any) => console.log(`Added subfolder: ${subFolder}`)),
        catchError(this.handleError)
      );
  }

  getSubfolders(parentFolderId: number) {
    return this.http.get(`${this.host}/Folder/${parentFolderId}/subfolders`)
      .pipe(
        tap((subfolders: any[]) => console.log(`Fetched subfolders: ${subfolders}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

}
