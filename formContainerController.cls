public with sharing class formContainerController {
    public formContainerController() {

    }
    @AuraEnabled
    public static string registerLead(string firstname, string lastname, string email, string companyname, string comment){
        try {
            lead le = new Lead();
            le.Firstname = firstname;
            le.Lastname = lastname;
            le.Email = email;
            le.Company = companyname;
            le.Comment__c = comment;
            le.Lead_Type__c = 'B2B store';
            insert le;
            return 'lead created successfully';
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string registerCase(string comment, string id){
        try {
            list<user> userlist = [SELECT u.Id, u.contactId FROM user u WHERE u.Id =:id ];

            case cas = new Case();
            cas.Comments = comment;
            cas.Origin = 'web';
            cas.ContactId = userlist[0].ContactId;
            insert cas;
            return 'case created successfully';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
