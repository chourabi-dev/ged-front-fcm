import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  loading:boolean = false;
  permessions:any[] = [];
  modalRef: BsModalRef;

  id;


   formRole = new FormGroup({
    roleIds: new FormControl([]),
    ASSIGN_SHARE_WITH_ROLES_START_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_ROLES_END_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_ROLES_ALLOW_DOWNLOAD: new FormControl(null), 
  })


  formUser = new FormGroup({ 
    userIds: new FormControl([]),
    ASSIGN_SHARE_WITH_USERS_START_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_USERS_END_DATE: new FormControl(null),
    ASSIGN_SHARE_WITH_USERS_ALLOW_DOWNLOAD: new FormControl(null)
  })


  
  roles:any[] = [];
  users:any[] = [];

  success:string='';
  error:string='';
  


 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addUserPermession(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  addRolePermessionModelOpen(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  
  constructor(private api:ApiService, private cdr: ChangeDetectorRef,private modalService: BsModalService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.api.getRolesList().toPromise().then((res:any)=>{
      this.roles = res;
      console.log(res);
      
    })


    this.api.getListOfUsers().toPromise().then((res:any)=>{
      console.log(res);
      this.users = res;
      
    })

    this.id = this.route.snapshot.params['id'];

    this.getData();
  }

 

  addUserPerrsionCall(){
    this.modalRef.hide(); 

    
    const body = this.formUser.value;

    console.log(body);


    const permessionsPayload = [];
    body.userIds.map((userID)=>{
      const payload = {
        documentId: this.id,
        userId: userID,
        endDate: body.ASSIGN_SHARE_WITH_USERS_END_DATE,
        isAllowDownload: body.ASSIGN_SHARE_WITH_USERS_ALLOW_DOWNLOAD,
        isTimeBound: body.ASSIGN_SHARE_WITH_USERS_START_DATE != null ? true : false,
        startDate: body.ASSIGN_SHARE_WITH_USERS_START_DATE
        
      };


      permessionsPayload.push(payload);

      this.api.addDocumentUserPermission({ documentUserPermissions :permessionsPayload }).toPromise().then((res)=>{
        console.log(res); 
        
        this.success="SERVER_SUCCESS";
        
      }).catch((err)=>{
        console.log(err);
        
        this.error='SERVER_ERROR';
      }).finally(()=>{
        this.cdr.detectChanges();
        this.getData();
      })


    })


    
  }


  addRolePerrsionCall(){
    

    

    this.modalRef.hide(); 

    
    const body = this.formRole.value;

    console.log(body);


    const permessionsPayload = [];
    body.roleIds.map((roleID)=>{
      const payload = {
        documentId: this.id,
        roleId: roleID,
        endDate: body.ASSIGN_SHARE_WITH_ROLES_END_DATE,
        isAllowDownload: body.ASSIGN_SHARE_WITH_ROLES_ALLOW_DOWNLOAD,
        isTimeBound: body.ASSIGN_SHARE_WITH_ROLES_START_DATE != null ? true : false,
        startDate: body.ASSIGN_SHARE_WITH_ROLES_START_DATE
        
      };


      permessionsPayload.push(payload);

      this.api.addDocumentRolePermission({ documentRolePermissions :permessionsPayload }).toPromise().then((res)=>{
        console.log(res); 
        
        this.success="SERVER_SUCCESS";
        
      }).catch((err)=>{
        console.log(err);
        
        this.error='SERVER_ERROR';
      }).finally(()=>{
        this.cdr.detectChanges();
        this.getData();
      })


    })



    
  }


 



  getData(){
    this.loading = true;

      this.cdr.detectChanges();

    this.api.documentRolePermission(this.id).toPromise().then((res:any)=>{
      console.log(res);
      
      this.permessions = res;
      
      
    }).catch((err)=>{
      
    }).finally(()=>{
      this.loading = false;
      this.cdr.detectChanges();
    })
  }






  toDeleteID;

  deleteCategory(template,id){
    this.toDeleteID = id;
    this.openModal(template);
  }

  confirmAndDelete(){
    this.modalRef.hide(); 
    this.api.documentRolePermissionDelete(this.toDeleteID).toPromise().then((res:any)=>{
      this.getData();
    })
  }
}
