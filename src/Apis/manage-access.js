export default {
   
    getTypeName(data){
        if(data=='winter-doubles'){
            return 'Winter Doubles';
        } else if(data=='winter-mixed-doubles') {
            return 'Winter Mixed Doubles';
        } else if(data=='winter-singles'){
            return 'Winter Singles';
        }
        return 'title';
    },
   /* 
    isShowCategory(data,type, category) {
        console.log(data, type, category);
        if(data[type] && data[type]==category){
            return true;
        } else{
            return false;
        }
    },
   getQueryCategory(data){
        if(data=='mens-3.0-singles'){
            return '3.0';
        } 
        else if(data=='mens-3.5-singles'){
            return '3.5';
        }
        else if(data=='mens-4.0-singles'){
            return '4.0';
        }
        else if(data=='mens-4.5-singles'){
            return '4.5';
        }
        else if(data=='womens-2.5-singles'){
            return '2.5';
        }
        else if(data=='womens-3.0-singles'){
            return '3.0';
        }
        else if(data=='womens-3.5-singles'){
            return '3.5';
        }
        else if(data=='womens-4.0-singles'){
            return '4.0';
        }        
    },
    getQueryType(data){
        if(data=='winter-doubles'){
            return 'doubles';
        } else if(data=='winter-mixed-doubles') {
            return 'mixed_doubles';
        } else if(data=='winter-singles'){
            return 'singles';
        }

    },
  /*   getCategoryName(data){

    },
   getPaidCategories(data){
        const categories =[];
        console.log(data);
        if(data.singles && data.singles.length){
            categories.push({name:'singles', value: data.singles});
        }
        if(data.additional_singles && data.additional_singles.length){
            categories.push({name:'additional_singles', value: data.additional_singles});
        }
        if(data.doubles && data.doubles.length){
            categories.push({name:'doubles', value: data.doubles});
        }
        if(data.additional_doubles && data.additional_doubles.length){
            categories.push({name:'additional_doubles', value: data.additional_doubles});
        }
        if(data.mixed_doubles && data.mixed_doubles.length){
            categories.push({name:'mixed_doubles', value: data.mixed_doubles});
        }
        if(data.additional_mixed_doubles && data.additional_mixed_doubles.length){
            categories.push({name:'additional_mixed_doubles', value: data.additional_mixed_doubles});
        }
        return categories;
    },
    isPaidCategory(categories, category_id){
        console.log(categories, category_id)
        let isShow=false;
         categories.forEach(element => {            
            if(element.matchrankcategories && element.matchrankcategories.id== category_id){
                isShow = true;
            }
            else{
                isShow = false;
            }

            console.log(isShow);
            if(isShow) return;
        });
        return isShow;      
    }
    */
}