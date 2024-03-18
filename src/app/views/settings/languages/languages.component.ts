import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '@app/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {


  loading:boolean = false;
  languages:any[] = [];
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

    this.api.getlanguages().toPromise().then((res:any)=>{
      this.languages = res

      console.log(res);
      
      
      
    }).catch((err)=>{
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

 

  toDeleteID;

  deleteLanguage(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide();
    this.api.deleteLanguage(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }


}
