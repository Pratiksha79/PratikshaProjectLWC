import { LightningElement,api, wire} from 'lwc';
 import getLead from '@salesforce/apex/LeadController.getLead';
 import sendEmail from '@salesforce/apex/createTask.sendEmail';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';


 const actions = [
    { label: 'Log a Call', name: 'logcall' }];

    const columns = [
    { label: 'Lead Name', fieldName: 'Name', type: 'text' },
    {label: 'Email',fieldName: 'Email',type: 'Email'},
    { type: 'action', typeAttributes: { rowActions: actions }}
];

 

export default class LeadCreation extends LightningElement {
   leads;
   selectedRows;
   columns = columns;
   recordId;
    
  @wire(getLead)
    fetchedLeads({error, data}) {
        if (error) {
          this.Error= error;
        } else if (data) {
           this.leads= data;
           console.log('Leads are'+this.leads);
        }
    }


    handleRowAction(event) {
      //  this.selectedRows = rows;
      const row = event.detail.row;
      this.recordId=row.Id;
      console.log('record id is '+this.recordId);
    // console.console.log('row is '+row);
      this.template.querySelector('c-log-call-modal').handleModal(this.recordId);
    }

    sendEmail(event){
        this.taskObject=event.detail;
        console.log('task obj is '+JSON.stringify(this.taskObject));
        sendEmail({task:this.taskObject})
        .then((result) => {
            this.logResult = result;
            console.log("data");
            console.log(JSON.stringify(this.logResult));
        }).catch((err) => {
            console.log("error");
            console.log(err);
        });
    }
}