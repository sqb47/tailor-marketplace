export function emptyFields(){
    for( var i = 0; i < arguments.length; i++ ) {
        if (arguments[i]==''){
            return true;
        }
    }
    return false;
}

export function emptyField(data){
    console.log('validation',data !="")
    return (data !="");
}

export function emailValidation(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function phoneValidation(phone){
    const re = /^[0-9]*$/;
    return (re.test(String(phone)));
}
export function passwordValidation(password, confirmPassword){
    return (password == confirmPassword)
}
export function nameValidation(name){
    const re = /^[a-zA-Z ]*$/;
    return (re.test(String(name)));
}
export function numberValidation(number){
    const re = /^[0-9]*$/;
    return (re.test(String(number)));
}