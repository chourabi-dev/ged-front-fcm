import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '@app/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  roles:any[] = [];
  loading:boolean = false;

  modalRef: BsModalRef;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  constructor(private modalService: BsModalService, private api:ApiService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }


  getData(){
    this.loading = true;

      this.cdr.detectChanges();

    this.api.getRolesList().toPromise().then((res:any)=>{

      console.log(res);
      
      this.roles =  res;
 
      
    }).catch((err)=>{
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

}
