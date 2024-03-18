import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-add-smtp',
  templateUrl: './add-smtp.component.html',
  styleUrls: ['./add-smtp.component.css']
})
export class AddSmtpComponent implements OnInit {

  form = new FormGroup({
    encryption: new FormControl(''),
    fromName: new FormControl('',Validators.required),
    host: new FormControl('',Validators.required),
    isDefault: new FormControl(false,Validators.required),
    password: new FormControl('',Validators.required),
    port: new FormControl('',Validators.required),
    userName: new FormControl('',Validators.required),
     
  })

  

  loading:boolean = false;
  success:string = '';
  error:string='';



  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  save(){
    this.cdr.detectChanges();


    const body = this.form.value;

    this.loading = true;
    this.error='';
    this.success='';

    this.api.createSMTP(body).toPromise().then((res:any)=>{
      console.log(res);
      
      this.success = 'Data inserted successfully.';
      
       this.form.reset();
    }).catch((err:HttpErrorResponse)=>{ 
      
      this.error=err.error.name[0];

    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })

    

  }
}
