import { clientArMess } from './tr_json/ar/client';
import { validationArMess } from './tr_json/ar/validation';
import { clientEnMess } from './tr_json/en/client';
import { validationEnMess } from './tr_json/en/validation';

export const translations = {
    ar:{
        ...   clientArMess,
        ...   validationArMess,
    },
    en:{
        ...   clientEnMess,
        ...   validationEnMess,
    }
}
export class argsExample {
    "{property}"?:string
    "{count}"?:number
    "{value}"?:string
    "{code}"?:string
    "{id}"?:any
} 
export function translate(lang:keyof typeof translations,key:keyof typeof translations.ar,args?:argsExample){
    if(!lang) lang = "ar"
    if(!args) args = {}
    let message = translations[lang][key]
    let keys = Object.keys(args)
    let regex:RegExp    
    if(keys.length) regex = new RegExp(keys.join("|"),"gi");
    message = message.replace(regex, function(matched){
      return args[matched];
    });
    return message;
}

export const trProperty = (arProperty,enProperty)=>{
    let property = global.lang == 'en' ? enProperty: arProperty    
    return property
}
