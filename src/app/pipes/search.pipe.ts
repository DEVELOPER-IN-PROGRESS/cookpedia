import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allRecipes:any[], searchKey:string): any[] {
    let result:any = [];
    console.log(searchKey);
    if(!allRecipes || searchKey==""){
      return allRecipes;
    }
    result = allRecipes.filter( (item:any) =>
      //  console.log(item.name)
       item.name.toLowerCase().includes(searchKey.toLowerCase())
      )

    console.log(result);
    return result;
  }

}
