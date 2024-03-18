import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  title:string = '';
  logo:string = '';
  banner:string = '';
  

  constructor(private cdr: ChangeDetectorRef, private api:ApiService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.api.getCompanyProfile().toPromise().then((res:any)=>{
      this.title = res.title;
      this.cdr.detectChanges();
      
    })
  }
}
