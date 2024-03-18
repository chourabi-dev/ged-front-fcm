import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  roleIds:any[]= [];

  roles:any[] = [];


  form = new FormGroup({
   
    email : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    confirm_password : new FormControl('',Validators.required),
    phoneNumber : new FormControl('',Validators.required), 
    roleIds: new FormControl('',Validators.required)
  })

  loading:boolean = false;
  success:string = '';
  error:string='';



  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.getRolesList().toPromise().then((roles:any)=>{
      this.roles = roles;
      console.log(roles);
      
    })
  }

  save(){

    this.error='';
    this.success='';

    this.cdr.detectChanges();

    const body = this.form.value;
 
    const user = { 
        "firstName": body.firstName,
        "lastName": body.lastName,
        "email": body.email,
        "phoneNumber": body.phoneNumber,
        "password": body.password,
        "userName": body.email,
        "roleIds": body.roleIds
    }

    if (body.password == body.confirm_password) {
      this.loading = true;

      
    this.cdr.detectChanges();
     


      this.api.addNewUser(user).toPromise().then((res:any)=>{
        console.log(res);
        
        this.success = 'Data inserted successfully.';
        
         this.form.reset();
      }).catch((err:HttpErrorResponse)=>{ 
        

        if (err.error.name[0] != '') {
          this.error = err.error.name[0];
        }else{
          this.error  = 'ERROR_SERVER';
        }

      }).finally(()=>{
        this.loading = false;
        this.cdr.detectChanges();
      })
  
    } else {
      this.error='PASSWORD_MATCH';
    }


    

  }

}
