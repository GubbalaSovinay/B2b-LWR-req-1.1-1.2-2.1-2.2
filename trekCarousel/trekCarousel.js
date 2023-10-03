import { LightningElement } from 'lwc';
import CAROUSEL from '@salesforce/resourceUrl/CAROUSEL';

export default class CarouselStaticResources extends LightningElement {

    // Expose URL of assets included inside an archive file
    product1Url = CAROUSEL + '/carousel/wow.jpg';
    product2Url = CAROUSEL + '/carousel/red.jpg';
    product3Url = CAROUSEL + '/carousel/sun.jpg';
}