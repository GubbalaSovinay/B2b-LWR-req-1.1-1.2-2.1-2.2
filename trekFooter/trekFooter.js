import { LightningElement, api } from 'lwc';
import SOCIAL from '@salesforce/resourceUrl/SOCIAL';
import trek from '@salesforce/resourceUrl/trek';
import isguest from '@salesforce/user/isGuest';
import Id from '@salesforce/user/Id';
import formcontainer from 'c/formcontainer';
import description from '@salesforce/label/c.description';
import follow_us from '@salesforce/label/c.follow_us';


export default class trekFooter extends LightningElement {

    result;
    Guestuser=isguest;
    userId = Id;
    async handleClick(){
        this.result = await formcontainer.open(
            {
               
               
               content: 'hello',
               isGuestUser: this.Guestuser,
               userId: this.userId
               
            
            }
        );
        console.log(this.result);
        
    }

    labels={
        description,
        follow_us
    }

    logo = trek + '/trek/trek.png';
    
    ABOUT_COMPANY={
        NAME:'Trek',
        ROLE:'Full Stack Developer',
        EMAIL:'Trek@gmail.com',
        PHONE:'+911234567890',
        HOME: 'Andhra Pradesh, 533201, India',
        CHAT: '+911234567890'
    }

    SOCIAL_LINKS=[
        {
            type:'twitter',
            label:"twitter/Trek",
            link:"https://twitter.com",
            icon:SOCIAL+'/SOCIAL/twitter.svg'
        },
        {
            type: "facebook",
            label: "facebook/Trek",
            link: "https://facebook.com",
            icon: SOCIAL + '/SOCIAL/facebook.svg'
        },
        {
            type: "github",
            label: "github/Trek",
            link: "https://github.com",
            icon: SOCIAL + '/SOCIAL/github.svg'
        },
        {
            type: "linkedin",
            label: "linkedin/Trek",
            link: "https://www.linkedin.com",
            icon: SOCIAL + '/SOCIAL/linkedin.svg'
        },
    ]
    COMPANY_SUMMARY={
        DESCRIPTION: this.labels.description
    }
}

