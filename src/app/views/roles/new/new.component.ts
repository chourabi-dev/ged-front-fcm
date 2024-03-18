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

    name: new FormControl('',Validators.required)
  })

  loading:boolean = false;
  success:string = '';
  error:string='';


  roles:any[] = [];
  actions:any[] = [];
  pages:any[] = [];


  pagesActionsList = [];


  selectedActions:any[] = [];




  
  



  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    


    this.api.getPagesList().toPromise().then((res:any[])=>{
      this.pages = res;
       
     
      this.api.getActionsList().toPromise().then((res:any[])=>{
        this.actions = res; 


        this.pages.map((p)=>{
          if (p.children == null) {
            p.children = [];

            // search for actions

            this.actions.map((a)=>{
              if (a.pageId == p.id) {
                p.children.push(a);
              }
            })




          }

        })


        console.log(this.pages);
        
        this.pagesActionsList = this.pages;


        this.cdr.detectChanges();





      })





    })
    
  }

  save(){
    this.cdr.detectChanges();


    const body = this.form.value;



    

    let claimedRoles = [];
    
    this.selectedActions.map((a)=>{
      claimedRoles.push({
        actionId: a.id,
        claimType: a.code,
        claimValue:''
      })
    })
 


    let role = {
      name:body.name,
      roleClaims:claimedRoles,
      userRoles:[]
    }
 


    this.loading = true;
    this.error='';
    this.success='';

    this.api.addNewRole(role).toPromise().then((res:any)=>{
      
      this.router.navigateByUrl('/roles');
      
       this.form.reset();
    }).catch((err:HttpErrorResponse)=>{ 
      this.error=err.error.name[0];
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })

    

  }



  actionChange(action){
    let inserted = false;
    let searchIndex = 0;
    
    this.selectedActions.map((a,index)=>{
      if (action.id == a.id) {
        inserted = true;
        searchIndex = index;
      } 
    })


    console.log(inserted);
    

    if (inserted == false) {
      this.selectedActions.push(action);
    }else{
      this.selectedActions.splice(searchIndex,1) 
    }
 
    
    this.cdr.detectChanges();
    
  }


}
