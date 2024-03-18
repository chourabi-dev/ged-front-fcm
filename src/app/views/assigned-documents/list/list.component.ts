import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/api.service';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { updateListOfDocuments } from '@app/store/app-config/app-config.action';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  documents:any[] = []; 
  categories:any[] = []; 



  modalRef: BsModalRef;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  


  loading:boolean = false;
  serverIP:any= environment.apiUrl;

  form = new FormGroup({
    name: new FormControl('',Validators.required),
    meta: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required) 
  })

  constructor(private api:ApiService,private cdr: ChangeDetectorRef, private router:Router,private modalService:BsModalService) {  
    
  } 

  ngOnInit(): void {
    this.getData();
 
  }

  openDocument(document){
    this.router.navigate(['/documents/view/'+document.id, document ])
  }

  edit(document){
    this.router.navigate(['/documents/edit/'+document.id, document ])
  }

  relaod(){
    this.loading = true;
    this.cdr.detectChanges();


    const body = this.form.value;

    console.log(body);
    

    this.api.getAssignedDocuments(
      body.category,
      body.name,
      body.meta

    ).toPromise().then( (res:any)=>{
      
      console.log(res);

      this.documents = res;  
  
    }).catch( (err)=>{

      console.log(err);
      
    }).finally(()=>{ 
      this.loading = false;
      this.cdr.detectChanges();
    })
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


    this.api.getDocumentCategories().toPromise().then((res:any)=>{
      this.categories = res;

      console.log( this.groupByParentId(this.categories) );
      

    })


    this.api.getAssignedDocuments().toPromise().then( (res:any)=>{
      
      console.log(res);

      this.documents = res;  
  
    }).catch( (err)=>{

      console.log(err);
      
    }).finally(()=>{ 
      this.loading = false;
      this.cdr.detectChanges();
    })
  }









  
  private downloadFile(data: HttpResponse<Blob>) {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = "download";
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }


  download(id){
    this.api.downloadFILE(id).subscribe(
      (event) => {
        if (event.type === HttpEventType.Response) {
           
          this.downloadFile(event);
        }
      },
     
    );
  }





  toDeleteID;

  deleteDocument(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide();
    this.api.deleteDocument(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }
}
