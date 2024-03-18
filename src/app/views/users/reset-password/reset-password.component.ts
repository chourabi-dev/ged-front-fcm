import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/api.service';
import { usersData } from '@app/mock-data/data/users';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {



  form = new FormGroup({
    password : new FormControl('',Validators.required),
    confirm_password : new FormControl('',Validators.required)
  })

  loading:boolean = false;
  success:string = '';
  error:string='';


  id;
  userData;



  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.initUser();
    
  }


  initUser(){
    this.api.getUserById(this.id).toPromise().then((res:any)=>{
      console.log(res);

      this.userData = res;
      
    })
  }


  

  save(){

    this.error='';
    this.success='';

    this.cdr.detectChanges();

    const body = this.form.value;
 
    const user = { 
      "email":this.userData.email,
      "userName":this.userData.userName,
      "password": body.password
    }

    if (body.password == body.confirm_password) {
      this.loading = true;

      
    this.cdr.detectChanges();
     


      this.api.resetUserPassword(user).toPromise().then((res:any)=>{
        console.log(res);
        
        this.success = 'PASSWORD_UPDATE';
        
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
