import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.css']
})
export class SubsComponent implements OnInit {

  loading:boolean = false;
  categories:any[] = [];
  modalRef: BsModalRef;

  id;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  



  constructor(private api:ApiService, private cdr: ChangeDetectorRef,private modalService: BsModalService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }




  
 groupByParentId(items:any[]) { 
  let parents = []; 
  
  return parents;
}


 



  getData(){
    this.loading = true;

      this.cdr.detectChanges();

    this.api.getDocumentCategories().toPromise().then((res:any[])=>{
      this.categories =  res.filter( (c)=>c.parentId == this.id )

      console.log(this.categories);
      
      
    }).catch((err)=>{
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })
  }






  toDeleteID;

  deleteCategory(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide();
    this.api.deleteCategory(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }


}
