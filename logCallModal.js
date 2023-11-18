import { LightningElement ,api,wire} from 'lwc';
import LogCall from '@salesforce/apex/createTask.logACall';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LogCallModal extends LightningElement {
    @api modal=false;
    Subject;
    comment;
    logResult;
    recordId;

    handleOnchange(event){
        if(event.target.label=='Subject'){
            this.Subject=event.target.value;
        }
        else if(event.target.label=='comment'){
            this.comment=event.target.value;
        }
    }
    @api handleModal(recordId){
        this.recordId=recordId;
        console.log('id is '+this.recordId);
        this.modal=true;
    }
    handleCancel(){
        this.modal=false;
    }
    
    handleSave(event) {
        LogCall({Subject:this.Subject, comment:this.comment, whoId:this.recordId})
        .then((result) => {
            this.logResult = result;
            console.log("data");
            console.log(JSON.stringify(this.logResult));
            const evt = new ShowToastEvent({
                title: "Activity Created",
                message: "Activity Created Successfully",
                variant: "success",
            });
            this.dispatchEvent(evt);

        }).catch((err) => {
            console.log("error");
            console.log(err);
        });
        
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('logcall', { detail: this.logResult }));
        }, 4000);
       
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.modal=false;
}
}