function GetObject(name,obj){
    var jsonstr = localStorage.getItem(name);
    return JSON.parse(jsonstr);
}

function SetObject(name,obj){
    localStorage.setItem(name, JSON.stringify(obj));
}

export{
    GetObject,
    SetObject
}