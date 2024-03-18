import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }

  getListOfDocuments(searchQuery?:string,date?:string,category?:string,name?:string,tags?:string){
    const URL =environment.apiUrl+'/api/documents?fields=&orderBy=createdDate%20desc&createDateString='+date+'&pageSize=100&skip=0&searchQuery='+searchQuery+'&categoryId='+category+'&name='+name+'&metaTags='+tags+'&id=';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.get(URL,{
        headers: headers
      })
    
  }

  getDocumentCategories(){
    const URL =environment.apiUrl+'/api/category/dropdown';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.get(URL,{
        headers: headers
      })
  }



  addNewCategory(body){
    const URL =environment.apiUrl+'/api/category';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.post(URL,body,{
        headers: headers
      })
  }

  updateCategory(body,id){
    const URL =environment.apiUrl+'/api/category/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.put(URL,body,{
        headers: headers
      })
  }


  deleteCategory(id){
    const URL =environment.apiUrl+'/api/category/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.delete(URL,{
        headers: headers
      })
  }





 

  getDocumentAudit(categoryId?,name?,createdBy?){ 
    const URL =environment.apiUrl+'/api/documentAuditTrail?fields=&orderBy=createdDate%20desc&pageSize=100&skip=0&searchQuery=&categoryId='+categoryId+'&name='+name+'&id=&createdBy='+createdBy;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.get(URL,{
        headers: headers
      }) 
  }
  


  getUserDropDown(){ 
    const URL =environment.apiUrl+'/api/user-dropdown';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.get(URL,{
        headers: headers
      }) 
  }



  getRolesList(){
    
    const URL =environment.apiUrl+'/api/role';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 

  }



  getActionsList(){ 
    const URL =environment.apiUrl+'/api/actions';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }

  
  getPagesList(){ 
    const URL =environment.apiUrl+'/api/pages';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  addNewRole(role){
   
    const URL =environment.apiUrl+'/api/role';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.post(URL,role,{
        headers: headers
      })
  }


  updateRole(role,id){
   
    const URL =environment.apiUrl+'/api/role/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
  
      return this.http.put(URL,role,{
        headers: headers
      })
  }



  getRoleDetailsByID(id){
    
    const URL =environment.apiUrl+'/api/role/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }



  getListOfUsers(){
     
    const URL =environment.apiUrl+'/api/user';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }

  addNewUser(body){
     
    const URL =environment.apiUrl+'/api/user';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,body,{
        headers: headers
      }) 
  }



  getUserById(id){
    const URL =environment.apiUrl+'/api/user/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }




  updateUser(body,id){
    const URL =environment.apiUrl+'/api/user/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.put(URL,body,{
        headers: headers
      }) 
  }

 

  resetUserPassword(body){
     
    const URL =environment.apiUrl+'/api/user/resetpassword';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,body,{
        headers: headers
      }) 
  }
  

  deleteUserByID(id){ 
    const URL =environment.apiUrl+'/api/user/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.delete(URL,{
        headers: headers
      }) 
  }



  getLoginAudit(username){ 
    const URL =environment.apiUrl+'/api/loginAudit?fields=&orderBy=loginTime%20desc&pageSize=1000000&skip=0&searchQuery=&id=&userName='+username;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  getlanguages(){ 
    const URL =environment.apiUrl+'/api/languages';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  deleteLanguage(id){
    const URL =environment.apiUrl+'/api/languages/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.delete(URL,{
        headers: headers
      }) 
  }



 

  createSMTP(body){
     
    const URL =environment.apiUrl+'/api/emailSMTPSetting';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,body,{
        headers: headers
      }) 
  }
  

  getSMTPSettingsList(){
    
    const URL =environment.apiUrl+'/api/emailSMTPSetting';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }



  updateSMTP(body,id){
         
    const URL =environment.apiUrl+'/api/emailSMTPSetting/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.put(URL,body,{
        headers: headers
      }) 
  }

  deleteSMTP(id){
    const URL =environment.apiUrl+'/api/emailSMTPSetting/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.delete(URL,{
        headers: headers
      }) 
  }



  getCompanyProfile(){
    const URL =environment.apiUrl+'/api/companyProfile';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }



  downloadFILE(documentId,isVersion = false){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));
    
    const url = environment.apiUrl+`/api/document/${documentId}/download/${isVersion} `;
    return this.http.get(url, {
      headers: headers,
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }




  updateDocumentInformations(body,id){
    

    const URL =environment.apiUrl+'/api/document/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.put(URL,body,{
        headers: headers
      }) 

  }




  getDocumentMetaTags(id){ 
    const URL =environment.apiUrl+'/api/document/'+id+'/getMetatag';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
    
  }


  getDocumentHistory(id){ 
    const URL =environment.apiUrl+'/api/documentversion/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
    
  }
 


  restoreDocumentVersion(docID, versionID){
    

    const URL =environment.apiUrl+`/api/documentversion/${docID}/restore/${versionID}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,{},{
        headers: headers
      }) 
  }




  addNewDocument(document:any){
     
    let formData = new FormData();


    formData.append('uploadFile', document.fileData);
    formData.append('name', document.name);
    formData.append('categoryId', document.categoryId);
    formData.append('categoryName', document.categoryName);
    formData.append('description', document.description);
    
    
    formData.append(
      'documentMetaDatas',
      JSON.stringify(document.documentMetaDatas)
    );
    formData.append(
      'documentRolePermissions',
      JSON.stringify(document.documentRolePermissions ?? [])
    );

    formData.append(
      'documentUserPermissions',
      JSON.stringify(document.documentUserPermissions ?? [])
    );

    const headers= new HttpHeaders()
    
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));


    console.log(formData.get('name'));
    

    const URL =environment.apiUrl+`/api/document`;

      return this.http.post(URL,formData,{
        headers: headers
      }) 
      
  }




  uploadNewDocumentVersion(document){
    
    let formData = new FormData();

    formData.append('uploadFile', document.fileData);
    formData.append('documentId', document.id);


    const headers= new HttpHeaders()
    
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));


    console.log(formData.get('name'));
    

    const URL =environment.apiUrl+`/api/documentversion`;

      return this.http.post(URL,formData,{
        headers: headers
      }) 
  }




  deleteDocument(id){
    
    const URL =environment.apiUrl+'/api/document/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.delete(URL,{
        headers: headers
      }) 
  }



  getDocumentComments(id){ 
    const URL =environment.apiUrl+'/api/documentComment/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
    
  }


  addNewDocumentComment(comment){
    
    const URL =environment.apiUrl+'/api/documentComment';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,comment,{
        headers: headers
      }) 
  }


  deleteComment(id){
     
    const URL =environment.apiUrl+'/api/documentComment/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.delete(URL,{
        headers: headers
      }) 
  }





  getAssignedDocuments(categoryID='',documentName='',tags=''){ 
    const URL =environment.apiUrl+`/api/document/assignedDocuments?fields=&orderBy=createdDate%20desc&pageSize=100&skip=0&searchQuery=&categoryId=${categoryID}&name=${documentName}&metaTags=${tags}&id=`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  documentRolePermission(id){
    
    const URL =environment.apiUrl+'/api/DocumentRolePermission/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  
  documentRolePermissionDelete(id){
    
    const URL =environment.apiUrl+'/api/documentUserPermission/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.delete(URL,{
        headers: headers
      }) 
  }


  addDocumentUserPermission(data){
    const URL =environment.apiUrl+'/api/documentUserPermission';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,data,{
        headers: headers
      }) 
  }


  addDocumentRolePermission(data){
    const URL =environment.apiUrl+'/api/documentRolePermission';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,data,{
        headers: headers
      }) 
  }


  
 

  
  

  sendNewMail(email){
    const URL =environment.apiUrl+'/api/email';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,email,{
        headers: headers
      }) 
  }







  getAllReminders(subject="",message="",frequency=""){
    
    const URL =environment.apiUrl+`/api/reminder/all?fields=&orderBy=startDate%20desc&pageSize=15&skip=0&searchQuery=&subject=${subject}&message=${message}&frequency=${frequency}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  deleteReminder(id){
    
    const URL =environment.apiUrl+'/api/reminder/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.delete(URL,{
        headers: headers
      }) 
  }

  

  addNewReminder(data){ 
    const URL =environment.apiUrl+'/api/reminder';

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,data,{
        headers: headers
      }) 
  }



  getReminderByID(id){
    
    const URL =environment.apiUrl+'/api/reminder/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  updateReminder(body,id){
        
    const URL =environment.apiUrl+'/api/reminder/'+id;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.put(URL,body,{
        headers: headers
      }) 
  }




  getOneTimeReminder(month,year){
    
    const URL =environment.apiUrl+`/api/dashboard/onetimereminder/${month}/${year}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  
  yearlyreminder(month,year){
    
    const URL =environment.apiUrl+`/api/dashboard/yearlyreminder/${month}/${year}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  halfyearlyreminder(month,year){
    
    const URL =environment.apiUrl+`/api/dashboard/halfyearlyreminder/${month}/${year}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  quarterlyreminder(month,year){
    
    const URL =environment.apiUrl+`/api/dashboard/quarterlyreminder/${month}/${year}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }

  monthlyreminder(month,year){
    
    const URL =environment.apiUrl+`/api/dashboard/monthlyreminder/${month}/${year}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  weeklyreminder(month,year){
    
    const URL =environment.apiUrl+`/api/dashboard/weeklyreminder/${month}/${year}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  dailyreminder(month,year){
    
    const URL =environment.apiUrl+`/api/dashboard/dailyreminder/${month}/${year}`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }

 

  /***************** */

  getListOfConversations(){
    
    const URL =environment.apiUrl+`/api/conversations`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }
 

  sendMessage(uid,message,file=null){
 

    let formData = new FormData();


    
    formData.append('content', message);
    formData.append('receiver_id', uid); 
    
    if (file != null) {
      formData.append('file', file);
    }
    
    const URL =environment.apiUrl+`/api/message`;

    const headers= new HttpHeaders() 
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.post(URL,formData,{
        headers: headers
      }) 

  }



  getMessagesByConversationID(id){
    

    const URL =environment.apiUrl+`/api/conversations/${id}/messages`;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'));

      return this.http.get(URL,{
        headers: headers
      }) 
  }


  
}
