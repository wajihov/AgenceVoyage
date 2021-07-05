import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'searchCompany'
})
export class SearchCompanyPipe implements PipeTransform {

  transform(value: any, args: any): any {
    
    if(!value)return null;
    if(!args)return value;

    return value.filter(item => {
      let destination;
      let minPrice;
      let maxPrice;
      let departDate;
      let returnDate;

      if(args.destination !== '' && args.destination !== null && args.destination !== undefined){
        destination = item.title.toLowerCase().includes(args.destination.toLowerCase());
      }
      else{
        
        destination =  true;
      }
      if(args.minPrice !== undefined && args.minPrice !== null ){
        minPrice = (args.minPrice <= item.price);
      }
      else{
        minPrice= true;
      }
      if(args.maxPrice !== undefined && args.maxPrice !== null ){
        maxPrice = (args.maxPrice >= item.price);
      }
      else{
        maxPrice= true;
      }
      if(args.departDate !== '' && args.departDate !== undefined && args.departDate !== null ){
        
        departDate =  item.departDate.includes(args.departDate);
       
      }
      else{
        departDate= true;
      }

      if(args.returnDate !== '' &&  args.returnDate !== undefined && args.returnDate !== null ){
        returnDate = item.returnDate.includes(args.returnDate);
      }
      else{
        returnDate= true;
      }
     

        return ( destination && minPrice && maxPrice &&  departDate && returnDate);
    });
  }

}
