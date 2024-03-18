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
  categories:any[] = [];
  modalRef: BsModalRef;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  



  constructor(private api:ApiService, private cdr: ChangeDetectorRef,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getData();
  }




  
 groupByParentId(items:any[]) { 
  let parents = []; 
  items.map((p)=>{
    if (p.parentId == null) {
      parents.push(p);
    }
  }) 
  parents.map((p)=>{
    items.map((i)=>{
      if (i.parentId == p.id) { 
        if (p.children != null) {
          p.children.push(i)
        }else{
          p.children = [i]
        }

      }
    })
  }) 
  parents.map((p)=>{
    if (p.children == null) {
      p.children = [];
    } 
  }) 
  return parents;
}


 



  getData(){
    this.loading = true;

      this.cdr.detectChanges();

    this.api.getDocumentCategories().toPromise().then((res:any)=>{
      this.categories =  this.groupByParentId(res);

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
