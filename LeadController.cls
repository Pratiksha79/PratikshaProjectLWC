public  class LeadController {
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLead(){
        try {
            return [Select Id, Name, Email from Lead order by createdDate DESC LIMIT 10];
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}