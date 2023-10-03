
import { LightningElement,api,track,wire } from 'lwc';
import registerUser from '@salesforce/apex/register.registerUser';
import isEmailExist from '@salesforce/apex/register.isEmailExist';
import isPhoneExist from '@salesforce/apex/register.isPhoneExist';
import Trek_term_and_conditions_agreement from '@salesforce/label/c.Trek_term_and_conditions_agreement';
import pset from '@salesforce/apex/register.pset';
import This_field_is_required from '@salesforce/label/c.This_field_is_required';
import By_signing_up_you_are_agreeing_to_our from '@salesforce/label/c.By_signing_up_you_are_agreeing_to_our';
import terms_and_conditions from '@salesforce/label/c.terms_and_conditions';
import Already_have_an_account from '@salesforce/label/c.Already_have_an_account';
import Password_must from '@salesforce/label/c.Password_must';
import Password_did_not_match from '@salesforce/label/c.Password_did_not_match';
import valid_email_Address from '@salesforce/label/c.valid_email_Address';
import First_Name from '@salesforce/label/c.First_Name';
import Last_Name from '@salesforce/label/c.Last_Name';
import Phone from '@salesforce/label/c.Phone';
import Username from '@salesforce/label/c.Username';
import Confirm_Password from '@salesforce/label/c.Confirm_Password';
import Create_Password from '@salesforce/label/c.Create_Password';
import 	Password_Strength from '@salesforce/label/c.Password_Strength';
import 	Username_will from '@salesforce/label/c.Username_will';



// import getPSAForPsGroups from '@salesforce/apex/B2B_PermissionSetGroupAssignmentUtils.getPSAForPsGroups'
export default class customSelfRegister extends LightningElement 
{
    @api showModal = false; // to show the modal for an error success or any warning
     firstName = ''; // first name I have passed the apex class full name = firsrName+LastName;
     lastName = '';
     email = null;
     Phone = null;
     username = null;
     password = null;
     confirmPassword='';

     companyName=null;
     isComapnyUser = false;
     accountName = null;
     psetGroupId = '0PG8G0000004iwQ';
     newUID;
     loginUrl;
    // Error Handling

     errorCheck;
     defaultErrorMsg;
     emailError;
     errorMessage;
     passwordTooltip='tooltiptext tooltipHide';
     passwordTooltiperror = 'tooltiptext tooltipHide';


    // @track
    // @track error;
    showTermsAndConditions=false;
    userName = '';
    userCreated = false;
    showUserName;
    pageLoading = true;
    tooltip_style ='tooltiptext';
    tooltip_styleShow = 'tooltiptext tooltipShow';
    tooltip_styleHide = 'tooltiptext tooltipHide';
    tooltip_field = 'tooltiptext tooltipHide';

    showToast = false;
    toastTitle ="This Field is Required";
    toastMessage = "Please enter the correct/Required Value";

    labels ={
        Trek_term_and_conditions_agreement,
        This_field_is_required,
        By_signing_up_you_are_agreeing_to_our,
        terms_and_conditions,
        Already_have_an_account,
        Password_must,
        Password_did_not_match,
        valid_email_Address,
        First_Name,
        Create_Password,Confirm_Password,Username,Phone,Last_Name,Password_Strength,
        Username_will
    }


    connectedCallback()
    {
        this.pageLoading = false;
        this.defaultErrorMsg = "Something Went Wrong, Please Try Again after sometimes";
        this.errorCheck = false;
        this.isComapnyUser= false;
    }

    handleFirstNameChange(event)
    {
        this.firstName = event.target.value;
        if(!this.isComapnyUser)
        {
            this.accountName = this.firstName + this.lastName;
            console.log(this.accountName);
        }
        if(this.lastName == '' && this.firstName == '')
        {
            this.accountName = null;
        }
        if(this.lastName == null && this.firstName == null)
        {
            this.accountName = null;
        }

    }

    handleLastNameChange(event)
    {
        this.lastName = event.target.value;
        if(!this.isComapnyUser)
        {
            this.accountName = this.firstName + this.lastName;
            console.log(this.accountName);
        }
        if(this.lastName == '' && this.firstName == '')
        {
            this.accountName = null;
        }
        if(this.lastName == null && this.firstName == null)
        {
            this.accountName = null;
        }
    }
    

    handleEmailHover(event)
    {
        // On Hovering over Email
    }
    handleEmailChange(event)
    {
        this.email = event.target.value;
        this.userName = event.target.value;
    }
    onEmailInvalid(event)
    {

        if (!event.target.validity.valid) 
        {
            event.target.setCustomValidity('Enter a valid email address')
        }
    }
    onEmailInput(event)
    {

        event.target.setCustomValidity('')
    }
    handlePhoneChange(event){
        this.Phone =event.target.value;

    }

    handlePasswordChange(event){

        this.password = event.target.value;
    }

    handleConfirmPasswordChange(event){

        this.confirmPassword = event.target.value;
    }

    handleTermsAndConditions(event){

        this.showTermsAndConditions = true;
    }
    closeTermsAndConditions()
    {
        this.showTermsAndConditions = false;
    }







    //////////////////  Using Imperative Method  

    handleRegister(event)
    {
                            // Field Validation
                            console.log('Inside Handle Register');
                            this.errorCheck = false;
                            this.errorMessage = null;

                            this.tooltip_field = 'tooltiptext tooltipHide';
                            this.tooltip_field = 'tooltiptext tooltipHide';

                            if(!this.firstName || this.firstName == ''){

                                this.tooltip_field = 'tooltiptext tooltipShow';

                            } else {

                                this.tooltip_field = 'tooltiptext tooltipHide';
                            }

                            if(!this.lastName || this.lastName == ''){

                                this.tooltip_field = 'tooltiptext tooltipShow';

                            } else {
                                
                                this.tooltip_field = 'tooltiptext tooltipHide';
                            }

                            if(!this.email){

                                this.tooltip_field = 'tooltiptext tooltipShow';

                            } else {
                                
                                this.tooltip_field = 'tooltiptext tooltipHide';
                            }
                            
                            if(!this.Phone){

                                this.tooltip_field = 'tooltiptext tooltipShow';

                            } else {

                                this.tooltip_field = 'tooltiptext tooltipHide';
                            }

                            if(!this.password){

                                this.tooltip_field = 'tooltiptext tooltipShow';
                                this.tooltip_field = "tooltiptext tooltipHide";

                            } else {
                                
                                this.tooltip_field = 'tooltiptext tooltipHide';
                            }

                            if(!this.confirmPassword){

                                this.tooltip_field = 'tooltiptext tooltipShow';

                            } else {
                                
                                this.tooltip_field = 'tooltiptext tooltipHide';
                            }
                            //  End of field validation


                            // this.showNotification();
                            console.log('Inside the handleReg')
                            this.pageLoading = true;
                            this.errorCheck = false;
                            this.errorMessage = null;
                            // this.tooltip_style ='tooltiptext tooltipHide';
                            this.showToast = false;

                            if(this.firstName && this.lastName && this.email && this.userName && this.Phone && this.password && this.confirmPassword)
                            {

                                this.pageLoading = true;
                    
                                if(this.password != this.confirmPassword){
                    
                                    this.tooltip_field = "tooltiptext tooltipHide";
                                    this.passwordError = this.labels.Password_did_not_match;
                                    this.passwordTooltiperror = 'tooltiptext tooltipShow tooltipError';
                    
                                    event.preventDefault();
                    
                                    this.pageLoading = false;
                                    
                                    return;
                                }
                            }
                            this.pageLoading=true;
                            let emailCheck = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email);
                            this.pageLoading =false;
                            console.log('debug1');
                            if( emailCheck == null || emailCheck == undefined || emailCheck == false )
                            {
                                this.emailError= this.labels.valid_email_Address;
                                // this.showNotification();
                                console.log('Check2');
                                return;
                            }
                            this.pageLoading = true;

                            console.log('debug2');


                            ///////////
                            let passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.password);

                            if(passwordCheck == null || passwordCheck == undefined || passwordCheck == false){
                                console.log('debug3');
                                this.pageLoading = false;
                                this.passwordError = 'Password must be Minimum eight characters, at least one letter, one number and one special character.';
                                this.passwordTooltiperror = 'tooltiptext tooltipShow tooltipError';


                                
                                return;
                            } 
                            
                            if( this.accountName ==  '' || this.accountName == null)
                            {
                                this.errorCheck = true;
                                console.log('Account Assignment Error');
                                this.errorMessage = 'Please Refresh and Retry to Enter all Required Field';
                                this.pageLoading = false;
                                return;
                            }


                            console.log('debug3-1');
                            event.preventDefault();
                            //apex class call imperative method
                            
                            isEmailExist({Email: this.email})
                            .then((result) =>{
                                if(result != null && result != undefined && result == true)
                                {
                                    console.log('debug4');
                                    console.log('result', result)

                                    this.errorCheck = true;
                                    this.emailError = 'Your username already exists somewhere on the  Salesforce Ecosystem.';
                                    this.errorMessage= 'email alredy exists';
                                    this.pageLoading = false;
                                    console.log('Check 3');
                                }
                                else {
                                    isPhoneExist({Phone: this.Phone})
                                    .then((result3) =>{
                                        if(result3 != null && result3 != undefined && result3 == true)
                                        {
                                            console.log('debug4');
                                            console.log('result', result3)
                                 
                                            this.errorCheck = true;
                                            this.emailError = 'Your username already exists somewhere on the  Salesforce Ecosystem.';
                                            this.errorMessage = 'PhoneNumber already exists';
                                            this.pageLoading = false;
                                            console.log('Check 3');
                                        }
                                        else {
                                    

                                        registerUser({ firstName: this.firstName, lastName: this.lastName, email: this.email, phone:this.Phone, accountName : this.accountName, pass:this.password, orgUser:this.isComapnyUser})
                                        .then((result1) => 
                                        {
                                                        
                                            if(result1){    
                                
                                                
                                                // console.log(JSON.stringify(result1));
                                                console.log('Yay! User Created Successfully');
                                                this.newUID = result1[1];
                                                this.loginUrl = result1[3];
                                        
                                                this.userCreated  =true;
                                                this.assignPS();
                                            
                                            }
                                            this.pageLoading = false;
                                        })
                                        .catch((error) => {
                                            console.log('debugT2');
                                            
                            
                                            console.log('error-',error);
                                            // console.log('Check 5');

                                            this.pageLoading = false;
                            
                                            if(error && error.body && error.body.message){
                            
                                                this.errorCheck = true;
                                                this.errorMessage = error.body.message;
                                                console.log('Check 6');
                                                
                                            
                                            }           
                                            
                                        });
                                    }
                                        
                                    })
                                    .catch((error) => {
                                        console.log('debugT2');
                                        
                        
                                        console.log('error-',error);
                                        // console.log('Check 5');

                                        this.pageLoading = false;
                        
                                        if(error && error.body && error.body.message){
                        
                                            this.errorCheck = true;
                                            this.errorMessage = error.body.message;
                                            console.log('Check 6');
                                            
                                        
                                        }           
                                        
                                    });
                                }
                            })
                            .catch((error) => {
                                this.error = error;
                                console.log('debugT3');
                            
                                if(error && error.body && error.body.message){
                                    // console.log('Check 7');
                                    console.log('error msg-', error.body.message);
                                }

                                this.pageLoading = false;
                                
                            });
    }


    // Assigning Permission Sets to new User

    assignPS()
    {
        this.pageLoading = true;
        pset({permissionsetGroupsID:this.psetGroupId, userId:this.newUID})
        .then((result2) =>
        {
            console.log(result2);
            console.log(this.loginUrl);
            window.location.href = this.loginUrl;

        })
        .catch((error) =>
        {

            this.error = error;
            console.log('debugT4');
            this.pageLoading =false;
            console.log(error);
        });
    }
      // Track the password strength
       passwordStrength = {
        value: '',
        color: '',
        text: '',
    };
    passwordStrengthValue;
    passwordStrengthColor;
    passwordStrengthText;

    // Define a method to check the password strength
    checkPasswordStrength(password) {
        // Add your password strength criteria here
        // For example, you can check for the length and character types
        if (password.length < 8) {
           this.passwordStrengthValue = 'weak';
            this.passwordStrengthColor = 'strength-bar red';
            this.passwordStrengthText = 'weak';

        } else if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*#?&]/.test(password)) {
            this.passwordStrengthValue = 'strong';
            this.passwordStrengthColor = 'strength-bar green';
            this.passwordStrengthText = 'Strong';
            
        } else {
            this.passwordStrengthValue = 'medium';
            this.passwordStrengthColor = 'strength-bar orange';
            this.passwordStrengthText = 'Medium';
        }
    }

    // Handle password change and update password strength indicator
    handlePasswordChange(event) {
        this.password = event.target.value;
        this.passwordStrength = this.checkPasswordStrength(this.password);
    }

}