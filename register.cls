global without sharing class register {
    
    public register() 
    {

    }
    // Check if email exist or not if Email Exist then Do Not Create another user account
    @AuraEnabled
    public static boolean isEmailExist(String Email){
        try 
        {
            List <Contact> emailCon = [Select id,Email FROM Contact Where Email =:Email];
            if(emailCon.isEmpty())
            {
                return false;
            }
            else
            {
                return true;
            }   
        } 
        catch (Exception e) 
        {
            throw new AuraHandledException('User Already Exist Exception' + e.getMessage());
        }
    }
         // Check if Phone exist or not if phone Exist then Do Not Create another user account
     @AuraEnabled
     public static boolean isPhoneExist(String Phone){
         try 
         {
             List <Contact> phoneCon = [Select id,Phone FROM Contact Where Phone =:Phone];
             if(phoneCon.isEmpty())
             {
                 return false;
             }
             else
             {
                 return true;
             }   
         } 
         catch (Exception e) 
         {
             throw new AuraHandledException('User Already Exist Exception' + e.getMessage());
         }
    }



    // registration of new user

    @AuraEnabled
    public static List<String> registerUser(string firstName, String lastName, string email, String phone, string accountName,string pass,boolean orgUser)
    {
        List<Profile> profileId = [SELECT ID FROM Profile WHERE Name ='B2B Lightning Community Plus'];
        List <String> returnList = new List <String>();
        returnList.add('welcome');
        returnList.add('userID');
        returnList.add('No Error');
        String returnVal = 'Unknown Error';
        boolean alreadyIndivisualUser = checkExistingUserAc(firstName,lastName);
        // boolean alreadyCompanyUser = checkExistingCompanyAc(accountName);
        List<String>accVal = new List<String>();
        String companyAccountId ='NA';
       
        
            accVal =  accountHandling(accountName, firstName, lastName, orgUser);
        
        
                String acctID;
                String acctName;
                acctID = accVal.get(0);
                acctName = accVal.get(1);

                Contact con = new Contact();
                con.Lastname = firstName +' '+ lastName;
                con.Email = email;
                con.Phone = phone;
                con.AccountId = acctID;
                
                insert con;
                // generating a random number:
                String temp = String.valueOf(DateTime.now().getTime());


                String uAlias = firstName.SubString(0,1) + lastName.SubString(0,2)+temp.SubString(0,4); 
                // User u = new User(Username = email+'.SPARTAN',Email = email,FirstName = firstName, LastName=lastName,CommunityNickName = con.Id +'-'+DateTime.now().getTime());
                User u = new User(TimeZoneSidKey='America/Los_Angeles',
                LocaleSidKey='en_US',LanguageLocaleKey='en_US',
                ProfileId=profileId[0].Id,
                EmailEncodingKey='ISO-8859-1',
                Alias =uAlias,
                Username = email,
                Email = email, Phone = phone, FirstName = firstName, LastName=lastName,
                ContactId = con.Id ,
                CommunityNickName = firstName +' '+ lastName + temp.SubString(0,3) );

                System.debug('User Created Successfully');
                returnList.add(0,'User Created Successfully');



                // String uName = u.Username;
                    // System.debug('Into Site.CreateExternalUser');
                try
                {
                    String userId = Site.createExternalUser(u, acctId, pass);
                    if(userId != null)
                    {
                        returnList.add(1,userId);
                        returnVal = userId;
                        String emailResult = sendWelcomeMail(u, returnVal);
                       

                        ApexPages.PageReference pageRef = Site.login(u.Username,pass,'https://training2021org1--sovinay2.sandbox.my.site.com/trek/');
                        returnList.add(3,pageRef.getURL());
                                                       
                        
                        
                    }
                }
                catch(Site.ExternalUserCreateException e)
                {
                    List <String> errors = e.getDisplayMessages();
                    for(String error:errors)
                    {
                        System.debug('error:' +error);
                    }
                    System.debug(e.getMessage());
                    returnList.add(2,e.getMessage());
                }

                return returnList;
        // end of function    
        }


    /// SEND A WELCOME EMAIL
 @AuraEnabled
    public static String sendWelcomeMail(User usr, String userId){
        try {

            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

            List<EmailTemplate> welcomeTemplate = new List<EmailTemplate>([Select Id from EmailTemplate where name = 'welcome']);
                     
            mail.setSenderDisplayName('Trek');
            mail.setTargetObjectId(userId);
            mail.setTemplateId(welcomeTemplate[0].Id);
            mail.setSaveAsActivity(false);

            Messaging.sendEmail( new List<Messaging.SingleEmailMessage>{mail} );

            return 'success';

        } catch (Exception e) {            
            throw new AuraHandledException('Email Error:'+ e.getMessage());
        }
    }





    //Permission Set Assignment Method
    @AuraEnabled
    public static String pset(String permissionsetGroupsID, Id userId)
    {
        ID psetGroupId = permissionsetGroupsID;
        List<PermissionSetAssignment> psAssignments= new List<PermissionSetAssignment>();
        PermissionSetAssignment assignment = new PermissionSetAssignment(
            PermissionSetGroupId = psetGroupId, AssigneeId = userId
        );

        System.debug(assignment);

        psAssignments.add(assignment);
        upsert psAssignments;
        

        return 'SuccessAssignment' ;
    }



// Method to Create Individual Account

@AuraEnabled
public static List<String> accountHandling(String accountName,String firstName, String lastName, boolean orgUser)
{
    list<BuyerGroup> BuyerGroupMemberId =[SELECT Id FROM BuyerGroup WHERE Name='Trek Buyer Group'];
    List<String>accVal = new List<String>();
    try 
        {
                Account userAc = new Account();
                userAc.Name = firstName + lastName +' UserAccount';
                //userAc.CurrencyIsoCode = 'USD';
                insert userAc;
                userAc.IsPartner = true;
                upsert userAc;
                BuyerAccount buyerAccount = new BuyerAccount();
                buyerAccount.BuyerId = userAc.Id;
                buyerAccount.Name = userAc.Name;
                buyerAccount.IsActive = true;
                upsert buyerAccount;
                BuyerGroupMember bm = new BuyerGroupMember();
                bm.buyerId = userAc.Id;
                bm.BuyerGroupId = BuyerGroupMemberId[0].Id;
                upsert bm;

                accVal.add(userAc.Id);
                accVal.add(userAc.Name);
                return accVal;

        } 
        catch (Exception e) 
        {
                System.debug('Account Error'  + e.getMessage());
                throw new AuraHandledException('User Account or company Account Already exist: '  + e.getMessage());
                
        }
}

// if company User Then:
@AuraEnabled
public static String handleCompanyUser(String accountName,String firstName, String lastName, boolean orgUser)
{
    list<BuyerGroup> BuyerGroupMemberId =[SELECT Id FROM BuyerGroup WHERE Name='Trek Buyer Group'];
    String returnVal;
    try 
    {
                Account acct = new Account();
                acct.Name = accountName;
                //acct.CurrencyIsoCode = 'USD';
                insert acct;
                acct.IsPartner = true;
                
                upsert acct;
            
                String accID = acct.ID;
                returnVal = accID;
                BuyerAccount buyerAccount1 = new BuyerAccount();
                buyerAccount1.BuyerId = accID;
                buyerAccount1.Name = acct.Name;
                buyerAccount1.IsActive = true;
                upsert buyerAccount1;
                BuyerGroupMember bm1 = new BuyerGroupMember();
                bm1.buyerId = accID;
                bm1.BuyerGroupId = BuyerGroupMemberId[0].Id; 
                upsert bm1;
                // acct.IsBuyer = true;


                return returnVal;
    } 
    catch (Exception e) 
    {
       throw new AuraHandledException('Error in Company Account Creation:' + e.getMessage());
    }
}


// check if user account already exist
@AuraEnabled
public static Boolean checkExistingCompanyAc(String accountName)
{
    try 
    {
        String acName = accountName;
        List <Account> ac = [SELECT Id, Name FROM Account Where Name = :acName LIMIT 2];
        if(ac.isEmpty())
        {
            return false;
        }
        else
        {
            throw new AuraHandledException('Account Exist');
        }
    } 
    catch (Exception e) 
    {
        throw new AuraHandledException('Company Account Already Exist' + e.getMessage());
    }
}


// check if company account already exist
@AuraEnabled
public static Boolean checkExistingUserAc(String firstName, String lastName)
{
    try 
    {
        String acName = firstName + lastName +' UserAccount';
        List<Account> ac = [SELECT Id, Name FROM Account Where Name =: acName LIMIT 2];
        if(ac.isEmpty())
        {
            return false;
        }
        else
        {
            throw new AuraHandledException('company Account Already Exist');

        }
    } 
    catch (Exception e) 
    {
        throw new AuraHandledException('User Account Already Exist: ' + e.getMessage());
    }
}

}