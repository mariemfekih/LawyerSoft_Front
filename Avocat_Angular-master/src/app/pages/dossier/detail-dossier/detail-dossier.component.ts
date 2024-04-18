import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierService } from 'src/app/services/dossier.service';
import Swal from 'sweetalert2';
import * as pdfjsLib from 'pdfjs-dist';
import { Observable, forkJoin} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-detail-dossier',
  templateUrl: './detail-dossier.component.html',
  styleUrls: ['./detail-dossier.component.scss']
})
export class DetailDossierComponent implements OnInit {
  dossier: any = {};
  enEdition = false;
  pdfs: any[] = [];
  numeroCourrier: string; 
  thumbnailUrls: SafeUrl[] = [];
 
  constructor(private sanitizer: DomSanitizer, 
              private dossierService: DossierService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idDossier = params['idDossier'];

      this.dossierService.getDossierById(idDossier).subscribe(data => {
        this.dossier = data;
      });

      this.dossierService.getPdfsByDossierId(idDossier).subscribe((data) => {
        this.pdfs = data;

        this.loadMiniatures(idDossier);
      });
    });
  }

  activerEdition() {
    this.enEdition = true;
  }

  enregistrerModifications() {
    this.dossierService.updateDossier(this.dossier.idDossier, this.dossier)
      .subscribe(data => {
        this.enEdition = false;
      });
  }

  public deleteDossier(idDossier: number) {
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
        this.dossierService.deleteDossier(idDossier).subscribe(
          () => {
            this.router.navigate(['/list-dossiers']);
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

  loadPdf(pdfs) {
    const pdfData = pdfs.pdfContent; 

    const pdfContainer = document.getElementById('pdf-canvas'); 

    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // Rendre la page PDF sur le canvas
        const canvas = pdfContainer as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({ canvasContext: context, viewport });
      });
    });
  }

  loadMiniatures(idDossier: number) {
    this.dossierService.getMiniaturesByDossierId(idDossier)
      .pipe(
        switchMap((miniatures) => {
          const thumbnailObservables: Observable<SafeUrl>[] = miniatures.map(filename =>
            this.dossierService.getThumbnail(filename).pipe(
              map(data => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob([data], { type: 'image/png' }))) as SafeUrl)
            )
          );
          return forkJoin(thumbnailObservables);
        })
      )
      .subscribe((thumbnailUrls) => {
        console.log('Received Thumbnail URLs:', thumbnailUrls);
        this.thumbnailUrls = thumbnailUrls;
      });
  }

  supprimerMiniature(index: number): void {
    if (index >= 0 && index < this.thumbnailUrls.length) {
      this.thumbnailUrls.splice(index, 1);
      console.log("Supprimée")
    }
  }

  
 
 
 
}

