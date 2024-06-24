import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { FolderService } from 'src/app/services/folder.service';
import { CaseService } from 'src/app/services/case.service';
import { FileService } from 'src/app/services/file.service';
import { Case } from 'src/app/models/case';
import { Files } from 'src/app/models/file';

@Component({
  selector: 'app-info-folder',
  templateUrl: './info-folder.component.html',
  styleUrls: ['./info-folder.component.scss']
})
export class InfoFolderComponent implements OnInit {
  folder: any = {};
  enEdition = false;
  id: number;
  idFolder: number;
  newFolderName: string = '';
  subfolders: any[] = [];
  cases: Case[] = [];

  constructor(
    private folderService: FolderService,
    private caseService: CaseService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('id')!);

    this.route.params.subscribe(params => {
      this.idFolder = +params['idFolder'];

      this.folderService.getFolderById(this.idFolder).subscribe(data => {
        this.folder = data;
        this.loadSubfolders(this.idFolder);
      });

      this.caseService.getUserCasesWithoutFolder(this.id).subscribe(data => {
        this.cases = data;
      });
    });
  }

  loadSubfolders(parentFolderId: number) {
    this.folderService.getSubfolders(parentFolderId).subscribe(data => {
      this.subfolders = data;
    });
  }

  activerEdition() {
    this.enEdition = true;
  }

  enregistrerModifications() {
    this.folderService.updateFolder(this.folder.path, this.newFolderName)
      .subscribe(
        data => {
          this.enEdition = false;
          this.folder.name = this.newFolderName;
        },
        error => {
          console.error('Error updating folder:', error);
        }
      );
  }

  deleteFolder(path: string) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce dossier ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.folderService.deleteFolder(path).subscribe(
          () => {
            console.log(path)
            this.router.navigate(['/list-folder']);
            Swal.fire('Dossier supprimé avec succès', '', 'success');
          },
          (error) => {
            console.log("Erreur lors de la suppression du dossier :", error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du dossier', 'error');
          }
        );
      }
    });
  }
  showSubfolderFiles(subfolderId: number) {
    if (!subfolderId) {
      console.error('Subfolder ID is undefined');
      return;
    }

    this.fileService.getFilesByFolder(subfolderId).subscribe(
      (files: any[]) => {
        console.log(files)
        if (!files || files.length === 0) {
          const swalOptions: SweetAlertOptions = {
            title: '<h3 class="mb-0">Liste des fichiers</h3>',
            html: `
              <p>Aucun fichier trouvé dans ce sous-dossier.</p>
              <input type="file" id="fileInput" class="form-control file-input-custom mt-3"/>
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ajouter',
            customClass: {
              popup: 'swal2-wide-popup',
              title: 'swal2-title',
              closeButton: 'swal2-close-button'
            },
            preConfirm: () => {
              const fileInput = document.getElementById('fileInput') as HTMLInputElement;
              if (fileInput.files && fileInput.files.length > 0) {
                return fileInput.files[0];
              } else {
                Swal.showValidationMessage('Veuillez sélectionner un fichier');
                return null;
              }
            }
          };

          Swal.fire(swalOptions).then((result) => {
            if (result.isConfirmed && result.value) {
              this.uploadFile(subfolderId, result.value as File);
            }
          });
        } else {
          const swalOptions: SweetAlertOptions = {
            title: '<h3 class="mb-0">Liste des fichiers</h3>',
            html: `
              ${this.generateFilesListHtml(files)}
              <input type="file" id="fileInput" class="form-control file-input-custom mt-3"/>
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ajouter',
            cancelButtonText: 'Annuler',
            customClass: {
              popup: 'swal2-wide-popup',
              title: 'swal2-title',
              closeButton: 'swal2-close-button'
            },
            didOpen: () => {
              this.attachEventListeners();
            },
            preConfirm: () => {
              const fileInput = document.getElementById('fileInput') as HTMLInputElement;
              if (fileInput.files && fileInput.files.length > 0) {
                return fileInput.files[0];
              } else {
                Swal.showValidationMessage('Veuillez sélectionner un fichier');
                return null;
              }
            }
          };

          Swal.fire(swalOptions).then((result) => {
            if (result.isConfirmed && result.value) {
              this.uploadFile(subfolderId, result.value as File);
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching subfolder files:', error);
      }
    );
  }

  generateFilesListHtml(files: any[]): string {
    return `
      <ul class="list-group">
        ${files.map(file => `
          <li class="list-group-item">
            <a href="#" class="file-link" (click)="openFile(${file.path})" data-id="${file.id}">${file.name}</a>
            <button class="btn btn-sm btn-danger btn-delete-file" data-path="${file.path}">Delete</button>
            <button class="btn btn-sm btn-primary btn-update-file" data-path="${file.path}">Update</button>
          </li>
        `).join('')}
      </ul>
    `;
  }

  attachEventListeners() {
    document.querySelectorAll('.btn-update-file').forEach(button => {
      button.addEventListener('click', (event: Event) => {
        const path = (event.currentTarget as HTMLElement).getAttribute('data-path');
        if (path) {
          this.updateFileName(path);
        }
      });
    });

    document.querySelectorAll('.btn-delete-file').forEach(button => {
      button.addEventListener('click', (event: Event) => {
        const path = (event.currentTarget as HTMLElement).getAttribute('data-path');
        if (path) {
          this.deleteFile(path);
        }
      });
    });

    document.querySelectorAll('.file-link').forEach(link => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const fileId = (event.currentTarget as HTMLElement).getAttribute('data-id');
        if (fileId) {
          this.openFile(fileId);
        }
      });
    });
  }
  openFile(filePath: string) {
    if (!filePath) {
        console.error('Invalid file path');
        Swal.fire('Erreur', 'Chemin de fichier invalide', 'error');
        return;
    }

    console.log('Fetching document with path:', filePath); // Debug statement

    this.fileService.getDocumentById(filePath).subscribe(
        (blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        },
        (error) => {
            console.error('Error fetching the document:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la récupération du document', 'error');
        }
    );
}


  

  uploadFile(folderId: number, file: File) {
    this.fileService.addFileToFolder(folderId, file).subscribe(
      (response: string) => {
        Swal.fire('Success', 'Fichier téléchargé avec succès', 'success');
      },
      (error) => {
        console.error('Error uploading file:', error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors du téléchargement du fichier', 'error');
      }
    );
  }

  updateFileName(path: string) {
    Swal.fire({
      title: '<h3 class="mb-0">Modifier le nom du fichier</h3>',
      input: 'text',
      inputValue: '', // Set the current file name as the default value
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      customClass: {
        popup: 'swal2-wide-popup',
        title: 'swal2-title',
        cancelButton: 'swal2-cancel-button',
        confirmButton: 'swal2-confirm-button'
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newName = result.value as string;
        this.fileService.updateFileName(path, newName).subscribe(
          response => {
            Swal.fire('Success', response.message, 'success');
            // Optionally, refresh the list of files to reflect the new name
          },
          error => {
            console.error('Error updating file name:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du nom du fichier', 'error');
          }
        );
      }
    });
  }
  
  
  deleteFile(path: string) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce fichier ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileService.deleteFileByPath(path).subscribe(
          () => {
            Swal.fire('Success', 'Fichier supprimé avec succès', 'success');
          },
          (error) => {
            console.error('Error deleting file:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du fichier', 'error');
          }
        );
      }
    });
  }
 addSubfolder() {
    Swal.fire({
      title: '<h3 class="mb-0">Ajouter un sous-dossier</h3>',
      html: `
        <div class="form-group">
          <label for="caseDropdown" class="form-control-label">Sélectionner un cas:</label>
          <select id="caseDropdown" class="form-control form-control-alternative">
            ${this.cases.map(c => `<option value="${c.idCase}">${c.title}</option>`).join('')}
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      customClass: {
        popup: 'swal2-wide-popup',
        title: 'swal2-title',
        cancelButton: 'swal2-cancel-button',
        confirmButton: 'swal2-confirm-button'
      },
      preConfirm: () => {
        const selectedCaseId = (document.getElementById('caseDropdown') as HTMLSelectElement).value;
        return selectedCaseId ? Number(selectedCaseId) : null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const selectedCaseId = result.value as number;
        this.folderService.addSubFolder(this.idFolder, selectedCaseId).subscribe(
          () => {
            Swal.fire('Sous-dossier ajouté avec succès', '', 'success');
            this.loadSubfolders(this.idFolder);
          },
          (error) => {
            console.log("Erreur lors de l'ajout du sous-dossier :", error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du sous-dossier', 'error');
          }
        );
      }
    });
  }
}
  