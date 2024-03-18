import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/api.service';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { updateListOfDocuments } from '@app/store/app-config/app-config.action';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  id;

  comments:any[] = [];  


  modalRef: BsModalRef;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  


  loading:boolean = false;
  serverIP:any= environment.apiUrl;

  form = new FormGroup({
    comment: new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private route:ActivatedRoute, private cdr: ChangeDetectorRef, private router:Router,private modalService:BsModalService) {  
    
  } 

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.getData();
 
  }

  

  

  getData(){
    
    this.loading = true;
    
    this.cdr.detectChanges();

    this.api.getDocumentComments(this.id).toPromise().then((res:any)=>{
      this.comments = res;

      console.log(this.comments);
      
 

    }).catch( (err)=>{

      console.log(err);
      
    }).finally(()=>{ 
      this.loading = false;
      this.cdr.detectChanges();
    })
  }



 



  toDeleteID;

  deleteComment(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide();
    this.api.deleteComment(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }


  save(){
    this.loading = true;
    this.form.reset();
    
    this.cdr.detectChanges();
    
    const comment = {
      comment: this.form.value.comment,
      documentId: this.id
    }


    this.api.addNewDocumentComment(comment).toPromise().then((res)=>{
      this.getData();
      this.loading = false;
      this.cdr.detectChanges();
    
    })
  }

}
