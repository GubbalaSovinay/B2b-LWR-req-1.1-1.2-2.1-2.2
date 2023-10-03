import { LightningElement, api, track  } from 'lwc';
import LightningModal from 'lightning/modal';
import registerCase from '@salesforce/apex/formContainerController.registerCase';
import registerLead from '@salesforce/apex/formContainerController.registerLead';
import First_Name from '@salesforce/label/c.First_Name';
import Last_Name from '@salesforce/label/c.Last_Name';
import Comment from '@salesforce/label/c.Comment';
import Company_Name from '@salesforce/label/c.Company_Name';
import Submit from '@salesforce/label/c.Submit';
import Contact_Form from '@salesforce/label/c.Contact_Form';


export default class formContainerController extends LightningModal {
  // Data is passed to apis via .open({ options: [] })
  @api content;
  @api isGuestUser;
  @api userId;

  @track firstName = '';
  @track lastName = '';
  @track email = null;
  @track companyName= null;
  @track comment= null;

  labels={
    First_Name,Last_Name,	Company_Name,Comment,Submit,Contact_Form
  }


  handleFirstNameChange(event)
  {
    this.firstName = event.target.value;
  }
  handleLastNameChange(event)
  {
    this.lastName = event.target.value;
  }
  handleEmailChange(event)
  {
    this.email = event.target.value;
  }
  handleCompanyNameChange(event)
  {
    this.companyName = event.target.value;
  }
  handleComment(event)
  {
    this.comment = event.target.value;
  }
  

    handleSubmitLead(){
    registerLead({firstname : this.firstName, lastname : this.lastName, email : this.email, companyname : this.companyName, comment : this.comment})
    .then((result) =>
      {
        console.log(result);
      })
      this.close('okay');
  }

  handleSubmitCase(){
    registerCase({comment : this.comment, id : this.userId})
    .then((result1) =>
    {
      console.log(result1)

    })
    this.close('Okay');
  }

}