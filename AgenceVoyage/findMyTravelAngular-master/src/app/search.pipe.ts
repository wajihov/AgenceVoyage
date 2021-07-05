import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): any {

   
    if(!value)return null;
    if(!args)return value;

        return value.filter(item => {
          let destination;
          let minPrice;
          let maxPrice;
          let duration;
          if(args.destination !== '' && args.destination !== null && args.destination !== undefined){
            destination = item.address.toLowerCase().includes(args.destination.toLowerCase());
          }
          else{
            
            destination =  true;
          }
          if(args.minPrice !== undefined && args.minPrice !== null ){
            minPrice = (args.minPrice <= item.cost);
          }
          else{
            minPrice= true;
          }
          if(args.maxPrice !== undefined && args.maxPrice !== null ){
            maxPrice = (args.maxPrice >= item.cost);
          }
          else{
            maxPrice= true;
          }
          if(args.duration !== undefined && args.duration !== null ){
            duration = (args.duration == item.duration);
          }
          else{
            duration= true;
          }
         

            return ( destination && minPrice && maxPrice &&  duration);
        });
  }

}
