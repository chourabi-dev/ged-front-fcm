import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/api.service';


@Component({
  selector: 'app-edit-smtp',
  templateUrl: './edit-smtp.component.html',
  styleUrls: ['./edit-smtp.component.css']
})
export class EditSmtpComponent implements OnInit {

  form = new FormGroup({
    encryption: new FormControl(''),
    fromName: new FormControl('',Validators.required),
    host: new FormControl('',Validators.required),
    isDefault: new FormControl(false,Validators.required),
    password: new FormControl('',Validators.required),
    port: new FormControl('',Validators.required),
    userName: new FormControl('',Validators.required)

  })

  

  loading:boolean = false;
  success:string = '';
  error:string='';


  id;



  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.api.getSMTPSettingsList().toPromise().then((res:any)=>{
      res.map((s)=>{
        if (s.id == this.id) {
          this.form.setValue({
            encryption:  s.encryption,
            fromName:   s.fromName,
            host:  s.host,
            isDefault:   s.isDefault,
            password:  s.password,
            port:   s.port,
            userName:  s.userName
          })
        }
      })
    })


  }

  save(){
    this.cdr.detectChanges();


    const body = this.form.value;

    this.loading = true;
    this.error='';
    this.success='';

    this.api.updateSMTP(body,this.id).toPromise().then((res:any)=>{
      console.log(res);
      
      this.success = 'Data updated successfully.';
      
    }).catch((err:HttpErrorResponse)=>{ 
      
      this.error=err.error.name[0];

    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })

    

  }
}
