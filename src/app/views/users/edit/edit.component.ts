import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  roleIds:any[]= [];

  roles:any[] = [];


  form = new FormGroup({
   
    email : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required), 
    phoneNumber : new FormControl('',Validators.required), 
    roleIds: new FormControl('',Validators.required)
  })

  loading:boolean = false;
  success:string = '';
  error:string='';





  id;
  

  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.form.controls.email.disable();

    
    this.id = this.route.snapshot.params['id'];



    this.api.getRolesList().toPromise().then((roles:any)=>{
      this.roles = roles;
      console.log(roles);


      this.initForm();
      
    })

   


  }


  usersData;



  initForm(){
    this.api.getUserById(this.id).toPromise().then((user:any)=>{
      console.log(user);

      this.usersData = user;

      let tmpRoles = [];
      user.userRoles.map((r)=>{
        tmpRoles.push( r.roleId )
      })
 

      this.form.setValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName, 
        phoneNumber: user.phoneNumber,
        roleIds: tmpRoles
      })
      
    }).catch((err)=>{

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
        "phoneNumber": body.phoneNumber, 
        "userName":this.usersData.userName,
        "roleIds": body.roleIds,
        "email":this.usersData.email
    }
 
    this.loading = true;

      
    this.cdr.detectChanges();


    console.log(user);
    
     


      this.api.updateUser(user,this.id).toPromise().then((res:any)=>{
        console.log(res);
        
        this.success = 'Data updated successfully.';
         
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
  
     


    

  }
}
