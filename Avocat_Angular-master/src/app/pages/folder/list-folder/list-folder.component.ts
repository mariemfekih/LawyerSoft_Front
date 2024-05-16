import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Folder } from 'src/app/models/folder';
import { FolderService } from 'src/app/services/folder.service';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-list-folder',
  templateUrl: './list-folder.component.html',
  styleUrls: ['./list-folder.component.scss']
})
export class ListFolderComponent implements OnInit {
  public folder: Folder[] = [];
  searchTerm: string;
  searchedFolder: Folder[] = [];
  existingFolders: string[] = [];
  idCase: number;
  selectedCaseId: number = null; 
  casesWithoutFolders: any[] = [];
  folderName: string = ''; 

  constructor(private folderService: FolderService,
              private caseService: CaseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCase = this.route.snapshot.params['idCase'];
    this.getFolders();
    this.getCasesWithoutFolders();
  }

  getCasesWithoutFolders() {
    this.caseService.getCasesWithoutFolders().subscribe(
      (data) => {
        this.casesWithoutFolders = data;
      },
      (error) => {
        console.error("Error fetching cases without folders:", error);
      }
    );
  }

  onCaseChange() {
    if (this.selectedCaseId) {
      this.router.navigate(['/list-folder', this.selectedCaseId]);
    }
  }

  public getFolders() {
    this.folderService.getFolders().subscribe(
      (data) => {
        this.folder = data;
        this.searchedFolder = data;
      },
      (error) => {
        console.error("Error fetching folders:", error);
      }
    );
  }

  onSubmit() {
    if (!this.selectedCaseId || !this.folderName) {
      console.error("Case or folder name is undefined");
      return;
    }
  
    const folder: Folder = { name: this.folderName };
    this.folderService.addFolder(folder, this.selectedCaseId)
      .subscribe(
        (addedFolder) => {
          console.log("Folder added successfully:", addedFolder);
          this.getFolders();
          this.folderName = '';
          this.selectedCaseId = null;
          this.router.navigate(['/list-folder'])
        },
        (error) => {
          
          console.error("Error adding folder:", error);
        }
      );
  }
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedFolder = this.folder.filter(f => {
        return (
          f.name.toLowerCase().includes(searchTermLowerCase)
        );
      });
    } else {
      this.searchedFolder = this.folder.slice();
    }
  }
}