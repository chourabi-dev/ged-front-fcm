import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/api.service';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  
  id;
  document = null;
  
  
  documentMetaDatas:any[]=[];

  form = new FormGroup({
    categoryId: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required)
  })

  categories:any[] = [];

  error:string='';
  success:string='';
  

  loading:boolean = false;

  tag:string='';



  constructor(private route:ActivatedRoute,private api:ApiService,private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer) { }



  newTag(){
    this.documentMetaDatas.push({
      documentId: '', 
      id: '',
      metatag :this.tag
    })

    this.tag = '';
  }

  removeTag(i){
    this.documentMetaDatas.splice(i,1);
  }

  ngOnInit(): void {

    const data = this.route.snapshot.params;
    this.id = data.id;
 
    
    this.document = {
     categoryId : data.categoryId ,
     categoryName: data.categoryName ,
     createdByName: data.createdByName ,
     createdDate: data.createdDate ,
     description: data.description ,
     id: data.id ,
     name: data.name ,
     url: environment.apiUrl+'/'+data.url ,
     
    }
    
    
    this.api.getDocumentCategories().toPromise().then((res:any)=>{
      this.categories = res;

      this.cdr.detectChanges();


      console.log(this.document);
      
      this.form.setValue({
        categoryId: this.document.categoryId,
        description:this.document.description,
        name: this.document.name,
      })
    })


    // get meta data
    this.api.getDocumentMetaTags(this.id).toPromise().then((res:any)=>{
      console.log("tags",res);

      res.map((tag)=>{
        this.documentMetaDatas.push({
          documentId: this.id, 
          id: tag.id,
          metatag :tag.metatag
        })
      })

      this.cdr.detectChanges();
      
    })

    this.cdr.detectChanges();


  } 



  save(){
    this.cdr.detectChanges();


    const body = {
      categoryId: this.form.value.categoryId,
      description: this.form.value.description,
      documentMetaDatas: this.documentMetaDatas,
      id:this.document.id,
      name:  this.form.value.name,
    };

    this.loading = true;
    this.error='';
    this.success='';

    this.api.updateDocumentInformations(body,this.id).toPromise().then((res:any)=>{
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
