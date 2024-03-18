import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service'
import { Chat } from './chat.interface'
import { WildcardSearch } from '@app/shared/utils/WildcardSearch';
import { NumberFormatStyle } from '@angular/common';
import { ApiService } from '@app/api.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    temp: Chat[]
    chatList: Chat[]
    selectedId: string | NumberFormatStyle
    mobilePanelOpen: boolean = true;



    conversations =[];
    
    tmpConversations =[];
    

    contactID;

    
    constructor(private chatSvc: ChatService, private cdr: ChangeDetectorRef,private api:ApiService) {
      
    }

    ngOnInit(): void { 
        this.getConverstations();
    }



    getConverstations(){
        this.api.getListOfConversations().toPromise().then((res:any)=>{
            console.log(res);

            this.conversations = res.conversations;
            this.tmpConversations = res.conversations;
            

            this.cdr.detectChanges();
            
        })
    }



    fetch(id = '1') {
         
    }

    selectChat(id: string, uid=null) {
        this.selectedId = null;
        this.contactID=null;


        this.cdr.detectChanges();
        this.selectedId = id
        this.contactID = uid;

        this.mobilePanelOpen = false

        this.cdr.detectChanges();


    }
 


    receiveMessage(message: string) {
        console.log(message);
        this.getConverstations();


        
      }


    serach(e) {
        const searchValue = e.target.value
        
        if(searchValue) {
            this.conversations = this.conversations.filter((c)=>  ( c.users[0].firstName+' '+c.users[0].lastName  ) .toLowerCase().indexOf( searchValue.toLowerCase() ) != -1 )
        } else {
           this.conversations  = this.tmpConversations;
        }
    }

    onMobilePanelToggleOpen() {
        this.mobilePanelOpen = true
    }




    getLastMessage(conversation){
        let lastMessage='';
       /* conversation.messages.map((m)=>{
            if( m.isRead == 0 ){
                lastMessage = m.content;
            }
        });*/

        if (lastMessage == '') {


            let maxDate = new Date( conversation.messages[0].createdAt ).getTime();
            lastMessage = conversation.messages[0].content; 
            conversation.messages.map((m)=>{


                if( new Date(m.createdAt).getTime() > maxDate ){
                    lastMessage = m.content;
                    maxDate = new Date(m.createdAt).getTime();
                }
            });
        }

        return lastMessage;
    }




    getTimeElapsedSince(tmp): string {

        let date = new Date(tmp);
        
        const now = new Date();
        const elapsedMilliseconds = now.getTime() - date.getTime();
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const elapsedDays = Math.floor(elapsedHours / 24);
    
        if (elapsedDays > 0) {
            return `${elapsedDays}d`;
        } else if (elapsedHours > 0) {
            return `${elapsedHours}h`;
        } else if (elapsedMinutes > 0) {
            return `${elapsedMinutes}m`;
        } else {
            return `${elapsedSeconds}s`;
        }
    }
    
}
