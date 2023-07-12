import { parseBadgeJsonConfigFile } from "./parse-badge-json-config-file";


type argumentsDictType = '--badges-config';

const argumentsDict : {[key in argumentsDictType]:(...args:any)=> any}= {
  '--badges-config': parseBadgeJsonConfigFile,
}

export function parseArgument(args:string[]){
    for(let i = 2; i < args.length; i++){
      let key = args[i] as argumentsDictType;
      if(!key  || !argumentsDict[key]) continue; 
        argumentsDict[key](args[i+1]);
    }
}
