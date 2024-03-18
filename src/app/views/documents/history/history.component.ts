import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history:any[] = [];
  id;

  constructor(private api:ApiService,private cdr: ChangeDetectorRef, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getDATA();
  }


  getDATA(){
    this.api.getDocumentHistory(this.id).toPromise().then((res:any)=>{
      this.history = res;

      console.log(this.history);

      this.cdr.detectChanges();
      
    })
  }



  restore(id){
    // current doc id
    let docID  = this.history.filter((h)=>h.isCurrentVersion)[0].id
    this.api.restoreDocumentVersion(docID,id).toPromise().then((res:any)=>{
      console.log(res);

      this.getDATA();
      
    })
  }


  
  private downloadFile(data: HttpResponse<Blob>) {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = "download";
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }


  download(id){
    this.api.downloadFILE(id,true).subscribe(
      (event) => {
        if (event.type === HttpEventType.Response) {
           
          this.downloadFile(event);
        }
      },
     
    );
  }

}
