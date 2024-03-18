import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/api.service';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  id;
  document = null;
  fileData:any; 
  documentMetaDatas:any[]=[];

 

  form = new FormGroup({
    file: new FormControl('',Validators.required),
    categoryId: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    roleIds: new FormControl([]),
    usersIds: new FormControl([]),
    ASSIGN_SHARE_WITH_ROLES_START_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_ROLES_END_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_ROLES_ALLOW_DOWNLOAD: new FormControl(null),


    ASSIGN_SHARE_WITH_USERS_START_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_USERS_END_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_USERS_ALLOW_DOWNLOAD: new FormControl(null)
  })

  categories:any[] = [];

  roles:any[] = [];

  users:any[] = [];


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
    this.api.getDocumentCategories().toPromise().then((res:any)=>{
      this.categories = res;

      this.cdr.detectChanges(); 
    })  


    this.api.getRolesList().toPromise().then((res:any)=>{
      this.roles = res;
      console.log(res);
      
    })


    this.api.getListOfUsers().toPromise().then((res:any)=>{
      console.log(res);
      this.users = res;
      
    })

  } 



  save(){
    this.cdr.detectChanges();


    const body = this.form.value;

    console.log(body);



    let documentRolePermissions = [];
    let documentUserPermissions = [];
 

    body.roleIds.map((roleID)=>{
      documentRolePermissions.push(
        {"id":"","documentId":"","roleId":roleID,"isTimeBound":body.ASSIGN_SHARE_WITH_ROLES_START_DATE != null ? true : false ,"startDate":body.ASSIGN_SHARE_WITH_ROLES_START_DATE,"endDate":body.ASSIGN_SHARE_WITH_ROLES_END_DATE,"isAllowDownload":body.ASSIGN_SHARE_WITH_ROLES_ALLOW_DOWNLOAD},
      );
    })


    body.usersIds.map((userID)=>{
      documentUserPermissions.push(
        {"id":"","documentId":"","userId":userID,"isTimeBound":body.ASSIGN_SHARE_WITH_USERS_START_DATE != null ? true : false,"startDate":body.ASSIGN_SHARE_WITH_USERS_START_DATE,"endDate":body.ASSIGN_SHARE_WITH_USERS_END_DATE,"isAllowDownload":body.ASSIGN_SHARE_WITH_USERS_ALLOW_DOWNLOAD}
      );
    })

    const document = {
      fileData:  this.fileData,
      name: body.name,
      categoryId: body.categoryId, 
      categoryName: "",
      description: body.description,
      documentMetaDatas: this.documentMetaDatas,
      documentRolePermissions: documentRolePermissions,
      documentUserPermissions:documentUserPermissions
    }


    
  

    this.loading = true;
    this.error='';
    this.success='';

    this.api.addNewDocument(document).toPromise().then((res:any)=>{
      console.log(res);
      
      this.success = 'DOCUMENT_ADDED';

      
      
    }).catch((err:HttpErrorResponse)=>{ 
      this.error=err.error.name[0];
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })

    

  }


  upload(files) {
    if (files.length === 0) return; 

    this.fileData = files[0]; 
    this.form.get('name').setValue(files[0].name);
  }


}
