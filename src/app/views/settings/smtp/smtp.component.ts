import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '@app/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.css']
})
export class SmtpComponent implements OnInit {


  loading:boolean = false;
  smtps:any[] = [];
  modalRef: BsModalRef;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  



  constructor(private api:ApiService, private cdr: ChangeDetectorRef,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getData();
  }

 

  getData(){
    this.loading = true;

      this.cdr.detectChanges();

    this.api.getSMTPSettingsList().toPromise().then((res:any)=>{
      this.smtps =  res;
      
      
    }).catch((err)=>{
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })
  }






  toDeleteID;

  deleteSMTP(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide();
    this.api.deleteSMTP(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }
}
