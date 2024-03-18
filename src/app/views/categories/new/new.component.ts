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

  form = new FormGroup({
    description: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required)
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

    this.api.addNewCategory(body).toPromise().then((res:any)=>{
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
