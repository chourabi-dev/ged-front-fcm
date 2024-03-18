import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/api.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 
  id;

  form = new FormGroup({
    description: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required)
  })

  loading:boolean = false;
  success:string = '';
  error:string='';



  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.cdr.detectChanges();


    this.id = this.route.snapshot.params['id'];

    this.api.getDocumentCategories().toPromise().then((res:any[])=>{
      
      res.map((c)=>{
        if (c.id == this.id) {
          this.form.setValue({
            name:c.name,
            description:c.description
          })

          this.cdr.detectChanges();
        }

      })
      
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })

    
  }

  save(){
    this.cdr.detectChanges();


    const body = this.form.value;

    this.loading = true;
    this.error='';
    this.success='';

    this.api.updateCategory(body,this.id).toPromise().then((res:any)=>{
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
