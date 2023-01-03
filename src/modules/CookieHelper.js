/* Github @HeyCrab3 */
import Cookies from 'js-cookie'
let $cookies = Cookies;
function SetCookie(CookieName, CookieValue){
    $cookies.set(CookieName, CookieValue)
}
function GetCookie(CookieName){
    const CookieInfo = $cookies.get(CookieName);
    return CookieInfo;
}
function RemoveCookie(CookieName){
    $cookies.remove(CookieName)
}
export { SetCookie, GetCookie, RemoveCookie }