import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {



  loading:boolean = false;
  users:any[] = []; 
 

  modalRef: BsModalRef;


  form = new FormGroup({
    message: new FormControl('',Validators.required)
  })

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



  constructor(private api:ApiService, private cdr: ChangeDetectorRef,private modalService: BsModalService, private router:Router ) { }

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



  userID;

  sendMesage(template,id){
    this.userID = id;
    this.openModal(template);
  }

  startConverstaion(){
    this.modalRef.hide();


    let message = this.form.value.message;

    console.log(message);
    

    this.api.sendMessage(this.userID,message).toPromise().then((res:any)=>{
      console.log(res);

      this.router.navigateByUrl('/apps/chat');
      
      
    })
    
    
  }


}
