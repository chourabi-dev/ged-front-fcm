import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/api.service';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id;
  document = null;
  imageUrl;



  constructor(private route:ActivatedRoute,private api:ApiService,private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

   const data = this.route.snapshot.params;

   
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
   
   console.log(this.document);
   this.cdr.detectChanges();

   this.getDocumentDATA();
  }


  

  getDocumentDATA(){
 
    const version = this.document.name == null ? true : false;
  
    
    this.api.downloadFILE(this.id, version)
      .pipe(
        delay(500)
      )
      .subscribe(data => {
        
        if (data.type === HttpEventType.Response) {
          const imgageFile = new Blob([data.body], { type: data.body.type });
          this.imageUrl = URL.createObjectURL(imgageFile)
         
          
          this.cdr.detectChanges();
        }
      }, (err) => {
        
        
      })

  }

}
