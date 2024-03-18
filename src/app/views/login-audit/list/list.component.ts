import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('',Validators.required)
  })

  loading:boolean = false;


  loginAudit:any[] = [];



  constructor(private api:ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }

  relaod(){
    this.getData();
  }


  getData(){
    this.loading = true;
    
    this.cdr.detectChanges();

    this.api.getLoginAudit(this.form.value.name).toPromise().then((res:any)=>{
       
      this.loginAudit = res;
  
      console.log(this.loginAudit);
      
      
      
    }).catch((err)=>{
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

}
