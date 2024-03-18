import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../chat.service'
import { Chat } from '../chat.interface'
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ApiService } from '@app/api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'conversation',
    templateUrl: './conversation.component.html',
    host: {
        '[class.conversation]': 'true'
    }
})
export class ConversationComponent implements OnInit {

    @ViewChild('chatPS') chatPS: PerfectScrollbarComponent;
    chat: any;

    message: string="";
    private _id: string;


    contactNAME:string='...';
    

    @Input() userID:any;
    @Input() set chatId(id) {
       this._id = id;
       this.fetchChatDetail(id);
    }

    me = JSON.parse(localStorage.getItem('authObj')).id;


    fileData;
 


    serverIP = environment.apiUrl;

    messages:any[]=[];
    
    get chatId(): string {
        return this._id;
    }

    @Output() updateChat: EventEmitter<any> = new EventEmitter<any>();
    @Output() openMobilePanel = new EventEmitter();


    @Output() messageEvent = new EventEmitter<string>();

    constructor(private chatSvc: ChatService, private cdr: ChangeDetectorRef, private api:ApiService) { }

    ngOnInit(): void {
        console.log(this._id);

        // we have the conversation !!!

        console.log("me: ",this.me);
        console.log("userID :",this.userID);


 
        this.api.getUserById(this.userID).toPromise().then((res:any)=>{
            
            this.contactNAME = res.firstName+' '+res.lastName;
            this.cdr.detectChanges();
        })
        
        
    }

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    fetchChatDetail(id: string) {
        this.api.getMessagesByConversationID(id).toPromise().then((res:any)=>{
            console.log(res);

            this.messages = res. messages;
            
            this.cdr.detectChanges();
            
            setTimeout(() => {
                this.scrollToBottom();
            }, 500);
        })
        
    }

    sendMessage() {
        let msgID = new Date().getTime();

        
        let text = this.message;
        
 
        this.messages.push(
            {
                "id": msgID,
                "content": this.message,
                "senderId": "4d2689d8-6f72-4aa6-911d-2414c1a751af",
                "receiverId": "3d1b20c8-86ec-43cd-a2cd-e52c13bb880d",
                "conversationId": "9569f6f4-4a10-4fe3-bdf2-0917880582a6",
                "uploads": this.fileData != null ? msgID : null,
                "isRead": 0,
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),
                "sender": {
                    "id": this.me, 
                }
                
            }
        );


        

       if (this.fileData != null) {
        var reader = new FileReader();
        reader.onload = function (e) {
            let image:any = document.getElementById('image-'+msgID);
            
            image.src=e.target.result
        };
        reader.readAsDataURL(this.fileData);
       }


            
        this.message='';
 
        this.scrollToBottom();

        if (this.fileData != null) {
            this.api.sendMessage(this.userID,text,this.fileData).toPromise().then((res:any)=>{
                console.log(res);
                this.messageEvent.emit('REFRESH');
            })
    
        }else{
            this.api.sendMessage(this.userID,text).toPromise().then((res:any)=>{
                console.log(res);
                this.messageEvent.emit('REFRESH');
                
                
            })
    
        }



        this.fileData = null;

        

    }

    scrollToBottom(): void {
        this.chatPS.directiveRef.scrollToBottom()            
    }

    onMobilePanelOpen() {
        this.openMobilePanel.emit()
    }



    emoji(){
        var inputElement = document.getElementById("message");
        inputElement.focus();

       /* var event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            button: 2 // Right mouse button
        });
        inputElement.dispatchEvent(event);*/

        document.execCommand('insertText', false, '');

        console.log("emoji");
        
    }


    chooseFile(){
        document.getElementById('file').click();

    }


    
  upload(files) {
    if (files.length === 0) return; 

    this.fileData = files[0];  
  }



  checkURLifISimage(url){
    const fileNameParts = url.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Add more if needed
    if (acceptedExtensions.includes(fileExtension)) {
      return true;
    }
  
    return false;
  }


   isImage(file: File): boolean {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
  
    // Check MIME type
    if (file.type && acceptedImageTypes.includes(file.type)) {
      return true;
    }
  
    // Check file extension
    const fileNameParts = file.name.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Add more if needed
    if (acceptedExtensions.includes(fileExtension)) {
      return true;
    }
  
    return false;
  }
}
