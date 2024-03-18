import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/api.service';


@Component({
  selector: 'app-add-sub',
  templateUrl: './add-sub.component.html',
  styleUrls: ['./add-sub.component.css']
})
export class AddSubComponent implements OnInit {


  form = new FormGroup({
    description: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required)
  })

  loading:boolean = false;
  success:string = '';
  error:string='';

  id;


  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  save(){
    this.cdr.detectChanges();


    const body = {
      parentId: this.id,
      description: this.form.value.description,
      name: this.form.value.name
      
    };

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
