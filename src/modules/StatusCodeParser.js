/* GitHub @HeyCrab3 */
function GetStatusCode(AxiosResponse){
    let StatusCode = AxiosResponse['data']['status']
    return parseInt(StatusCode)
}
function isPassedVerifictionInt(ResponseStatusCode,SuccessStatusCode){
    if(ResponseStatusCode == SuccessStatusCode){
        return true;
    }
    else{
        return false;
    }
}
function isPassedVerifictionBoolean(ResponseStatusCode){
    if(ResponseStatusCode == true){
        return true;
    }
    else{
        return false;
    }
}
export { GetStatusCode, isPassedVerifictionBoolean, isPassedVerifictionInt}