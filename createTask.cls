public with sharing class createTask {
    @AuraEnabled
    public static task logACall(String Subject, String Comment, Id whoId){
      
        Task t= new Task();
        t.whoId=whoId;
        t.subject=Subject;
        t.Description=Comment;

        try {
            insert t;
            return t;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }




    @AuraEnabled
    public static void sendEmail(Task task){
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        List<String> OwnerEmail=new List<String>();
        Task tMail=[Select id, owner.email from task where Id=:task.Id ];
        System.debug('task is  add is '+tMail);
        OwnerEmail.add(tMail.owner.email);
        System.debug('email add is '+OwnerEmail);
       // String OwnerEmail= task.owner.email;
      //  mail.toAddresses = new String[] { OwnerEmail };
        mail.setToAddresses(OwnerEmail);
        mail.setSenderDisplayName('System Admin');
        mail.setsubject('An Activity is Created');
        mail.plainTextBody = 'Please call to lead with Subject='+ task.Subject;
        try {
            //Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {mail};
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage()+ 'owner email is '+ OwnerEmail);
        }
    }
}