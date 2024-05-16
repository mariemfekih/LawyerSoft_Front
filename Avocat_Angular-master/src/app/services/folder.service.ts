import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Folder } from '../models/folder';
import { Observable, catchError } from 'rxjs';
import { FolderDto } from '../models/dto/FolderDto';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addFolder(folderDto: FolderDto, caseId: number): Observable<Folder> {
    return this.http.post<Folder>(`${this.host}/Folder/${caseId}`, folderDto)
      .pipe(
        catchError(error => {
          console.error(error);
          throw new Error('Failed to add folder');
        })
      );
  }
    
  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.host}/Folder`);
  } 
  
  checkFolderName(name: string, caseId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.host}/check-name/${caseId}/${name}`);
  }
    
}
