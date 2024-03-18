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

  reminders:any[] = []; 


  modalRef: BsModalRef;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  


  loading:boolean = false;
  serverIP:any= environment.apiUrl;

  form = new FormGroup({
    subject: new FormControl('',Validators.required),
    message: new FormControl('',Validators.required),
    frequency: new FormControl('',Validators.required),
    
  })

  frequencies:any[]=[
    0,
    1,
    2,
    3,
    4,
    5,
    
  ]

  constructor(private api:ApiService,private cdr: ChangeDetectorRef, private router:Router,private modalService:BsModalService) {  
    
  } 

  ngOnInit(): void {
    this.getData();
 
  }

 

  relaod(){
    
    this.loading = true;


    const body = this.form.value;
 
    this.api.getAllReminders(body.subject,body.message,body.frequency).toPromise().then( (res:any)=>{
      
      this.reminders = res;

      console.log(this.reminders);
      
  
    }).catch( (err)=>{

      console.log(err);
      
    }).finally(()=>{ 
      this.loading = false;
      this.cdr.detectChanges();
    })
  }


 

 
 


  getData(){
    
    this.loading = true;


 
    this.api.getAllReminders().toPromise().then( (res:any)=>{
      
      this.reminders = res;

      console.log(this.reminders);
      
  
    }).catch( (err)=>{

      console.log(err);
      
    }).finally(()=>{ 
      this.loading = false;
      this.cdr.detectChanges();
    })
  }


 


  toDeleteID;

  deleteItem(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide();
    this.loading = true;
    this.cdr.detectChanges();
    this.api.deleteReminder(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }

}
