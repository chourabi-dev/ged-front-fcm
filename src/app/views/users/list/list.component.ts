import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '@app/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  loading:boolean = false;
  users:any[] = []; 

  

  modalRef: BsModalRef;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



  constructor(private api:ApiService, private cdr: ChangeDetectorRef,private modalService: BsModalService ) { }

  ngOnInit(): void {
    this.getData();
  } 
 



  getData(){
    this.loading = true;

      this.cdr.detectChanges();

    this.api.getListOfUsers().toPromise().then((res:any)=>{
      this.users =  res;

      console.log(this.users);
      
      
    }).catch((err)=>{
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })
  }



  toDeleteID;

  deleteUser(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide();
    this.api.deleteUserByID(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }

 
 
}
