import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Courrier } from 'src/app/models/courrier';
import { DepartInterneDto } from 'src/app/models/depart-interne';
import { CourrierService } from 'src/app/services/courrier.service';
import { DossierService } from 'src/app/services/dossier.service';

@Component({
  selector: 'app-select-dossier',
  templateUrl: './select-dossier.component.html',
  styleUrls: ['./select-dossier.component.scss']
})
export class SelectDossierComponent implements OnInit {
  nomsDossiers: string[] = [];
  selectedDossier: any;
  numeroCourrier: string;
  selectedDossierId: number;
  contentPdf: Uint8Array | null = null;

  courrier: Courrier = new Courrier();



  constructor(private dossierService: DossierService,private router: Router, private route: ActivatedRoute,private courrierService: CourrierService) {}


  ngOnInit(): void {
    this.getNomsDossiers();
    this.getNumCourrier();
  }

  public getNomsDossiers() {
    this.dossierService.getNomsDossiers().subscribe((noms) => {
      this.nomsDossiers = noms;
    });
  }


  public getNumCourrier() {
    this.route.params.subscribe(params => {
    this.numeroCourrier = params['numeroCourrier'];
    });
  }

  onSubmit(addDossier:any){
    this.dossierService.ajouterDossier(addDossier).subscribe(
    ()=>{
      this.getNomsDossiers();
    },
    (err)=>{}
  )
 }

 onDossierSelected() {
  if (this.selectedDossier && this.numeroCourrier) {
    this.dossierService.affecterDossierACourrier(this.selectedDossier, this.numeroCourrier)
      .subscribe(() => {
        this.generateAndSavePdf();
      });
  }

}

generateAndSavePdf(): void {

  const doc = new jsPDF();
  //const fond = new Image();
  //fond.src = '/assets/img/fond_pdf.png';
  //doc.addImage(fond, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
  doc.text('A new opportunity called ' + '"' + this.numeroCourrier + '"' + ' is now available.', 30, 75);
  //doc.text('We believe this opportunity is a great fit for you,', 40, 90);
  //doc.text('and we encourage you to take advantage of it.', 41, 105);
  //doc.text('For further details, please scan the QR code below.', 37, 120);
  doc.setTextColor(255, 0, 0);

  const pdfContentArrayBuffer: ArrayBuffer = doc.output('arraybuffer');
  const pdfContentUint8Array = new Uint8Array(pdfContentArrayBuffer);

  doc.save('Courrier-' + this.numeroCourrier + '.pdf');

  const blob = new Blob([pdfContentArrayBuffer], { type: 'application/pdf' });
  const file = new File([blob], 'Courrier-' + this.numeroCourrier + '.pdf', { type: 'application/pdf' });

  this.courrierService.savePdf(file, this.numeroCourrier).subscribe(() => {
    console.log('PDF sauvegardé avec succès dans la base de données.');
  });

}



}



