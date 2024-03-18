 




import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form = new FormGroup({
    subject: new FormControl('',Validators.required),
    message: new FormControl('',Validators.required),
    REPEATE_REMINDER: new FormControl(false,),
    SEND_MAIL: new FormControl(false,),
    SELECT_USERS : new FormControl(false),
    usersIds : new FormControl([]),
    frequency: new FormControl(""), 
    multiple_days: new FormControl([]),
    weekly_day_choice : new FormControl(1),
    REMINDER_DATE: new FormControl('',Validators.required),
    REMINDER_END_DATE : new FormControl(''),


    first_quarter_month: new FormControl('1'),
    first_quarter_day: new FormControl(15),


    second_quarter_month: new FormControl('4'),
    second_quarter_day: new FormControl(15),


    third_quarter_month: new FormControl('7'),
    third_quarter_day: new FormControl(15),
 

    forth_quarter_month: new FormControl('10'),
    forth_quarter_day: new FormControl(15),



    first_half_month: new FormControl('1'),
    first_half_day:  new FormControl(15),

    second_half_month: new FormControl('7'),
    second_half_day:  new FormControl(15),
    
  })

  loading:boolean = false;
  success:string = '';
  error:string='';


  dayOfMonths=[
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ]


  days = [
    { 
      "dayOfWeek": 0, 
      "name": "Sunday"
    },
    { 
      "dayOfWeek": 1, 
      "name": "Monday"
    },
    { 
      "dayOfWeek": 2, 
      "name": "Tuesday"
    },
    { 
      "dayOfWeek": 3, 
      "name": "Wednesday"
    },
    { 
      "dayOfWeek": 4, 
      "name":"Thursday"
    },
    { 
      "dayOfWeek": 5, 
      "name":"Friday"
    },
    { 
      "dayOfWeek": 6,
      "name":"Saturday" 
    }
  ]


  users:any[]=[];

  frequencies:any[]=[
    0,
    1,
    2,
    3,
    4,
    5
  ]


  constructor(private router:Router, private api:ApiService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.getListOfUsers().toPromise().then((res:any)=>{
      this.users = res;
    })
  }

  save(){
    this.cdr.detectChanges();


    const body = this.form.value;

    this.loading = true;
    this.error='';
    this.success='';

  



    console.log(body);



    let reminderUsers = [];

    body.usersIds.map((uid)=>{
      reminderUsers.push(
        {
          "reminderId": "",
          "userId": uid
        }
      )
    })


    
    let dailyReminders = []; 

    body.multiple_days.map((day)=>{
      
      dailyReminders.push({
        dayOfWeek: day.dayOfWeek,
        name:  day.name,
        isActive:true,
        id:"",
        reminderId:""
      })
    })
    
 

    const payload = {
      dailyReminders:dailyReminders,
      dayOfWeek: body.weekly_day_choice,
      documentId: null,
      endDate:body.REMINDER_END_DATE,
      frequency: body.frequency,

      halfYearlyReminders: body.frequency == 4 ?[
        {
          "id": "",
          "reminderId": "",
          "quarter": 0,
          "day": body.first_half_day,
          "month": body.first_half_month,
          "name": "Jan - Jun",
          "monthValues": [
            {
              "id": 1,
              "name": "January"
            },
            {
              "id": 2,
              "name": "February"
            },
            {
              "id": 3,
              "name": "March"
            },
            {
              "id": 4,
              "name": "April"
            },
            {
              "id": 5,
              "name": "May"
            },
            {
              "id": 6,
              "name": "June"
            }
          ]
        },
        {
          "id": "",
          "reminderId": "",
          "quarter": 1,
          "day": body.second_half_day,
          "month": body.second_half_month,
          "name": "Jul - Dec",
          "monthValues": [
            {
              "id": 7,
              "name": "July"
            },
            {
              "id": 8,
              "name": "August"
            },
            {
              "id": 9,
              "name": "September"
            },
            {
              "id": 10,
              "name": "October"
            },
            {
              "id": 11,
              "name": "November"
            }
          ]
        }
      ]: [] ,
      quarterlyReminders: body.frequency == 3 ? [
        {
          "id": "",
          "reminderId": "",
          "quarter": 0,
          "day": body.first_quarter_day,
          "month": body.first_quarter_month,
          "name": "Jan - Mar",
          "monthValues": [
            {
              "id": 1,
              "name": "January"
            },
            {
              "id": 2,
              "name": "February"
            },
            {
              "id": 3,
              "name": "March"
            }
          ]
        },
        {
          "id": "",
          "reminderId": "",
          "quarter": 1,
          "day": body.second_quarter_day,
          "month": body.second_quarter_month,
          "name": "Apr - Jun",
          "monthValues": [
            {
              "id": 4,
              "name": "April"
            },
            {
              "id": 5,
              "name": "May"
            },
            {
              "id": 6,
              "name": "June"
            }
          ]
        },
        {
          "id": "",
          "reminderId": "",
          "quarter": 2,
          "day": body.third_quarter_day,
          "month": body.third_quarter_month,
          "name": "Jul - Sept",
          "monthValues": [
            {
              "id": 7,
              "name": "July"
            },
            {
              "id": 8,
              "name": "August"
            },
            {
              "id": 9,
              "name": "September"
            }
          ]
        },
        {
          "id": "",
          "reminderId": "",
          "quarter": 3,
          "day": body.forth_quarter_day,
          "month": body.forth_quarter_month,
          "name": "Oct - Dec",
          "monthValues": [
            {
              "id": 10,
              "name": "October"
            },
            {
              "id": 11,
              "name": "November"
            },
            {
              "id": 12,
              "name": "December"
            }
          ]
        }
      ]:[],

      isEmailNotification:body.SEND_MAIL,
      isRepeated:body.REPEATE_REMINDER,
      message:body.message, 
      reminderUsers:reminderUsers,
      startDate:body.REMINDER_DATE,
      subject:body.subject
    }




    console.log(payload);

    this.api.addNewReminder(payload).toPromise().then((res:any)=>{
      this.success='SERVER_SUCCESS';

    }).catch((err)=>{
      this.error='SERVER_ERROR';
    }).finally(()=>{
      this.cdr.detectChanges();
    })
    
    

    

  }

}
