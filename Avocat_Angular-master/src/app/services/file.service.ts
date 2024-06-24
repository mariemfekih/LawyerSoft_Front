import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Add a file to a folder
  addFileToFolder(folderId: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.host}/File/folders/${folderId}/files`, formData, { responseType: 'text' });
  }
  updateFileName(path: string, newName: string): Observable<{ message: string }> {
    const url = `${this.host}/File/${path}/updateFileName/${newName}`;
    return this.http.put<{ message: string }>(url, {});
  }
  

  // Delete file by path
  deleteFileByPath(path: string): Observable<void> {
    return this.http.delete<void>(`${this.host}/File/${path}`);
  }

  // Get file ID by path
  getFileIdByPath(filePath: string): Observable<string> {
    return this.http.get(`${this.host}/File/path/${filePath}`, { responseType: 'text' });
  }

  // Get all files
  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.host);
  }

  // Get file by ID
  getFileById(idFile: number): Observable<File> {
    return this.http.get<File>(`${this.host}/File/${idFile}`);
  }

  // Get files by folder ID
  getFilesByFolder(folderId: number): Observable<File[]> {
    return this.http.get<File[]>(`${this.host}/File/Folder/${folderId}`);
  }

  getDocumentById(fileId: string) {
    const url = `${this.host}/api/folders/document/${encodeURIComponent(fileId)}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
