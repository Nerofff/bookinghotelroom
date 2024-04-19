export function SmoothHorizontalScrolling(e, time, amount, start) {
    var eAmt = amount / 100;
    var curTime = 0;
    var scrollCounter = 0;
    const y = window.scrollY;
    while (curTime <= time) {
        window.setTimeout(SHS_B, curTime, e, scrollCounter, eAmt, start, y);
        curTime += time / 100;
        scrollCounter++;
    }
    window.scrollTo(0, y);
}

function SHS_B(e, SC, eAmt, start, y) {
    e.scrollLeft = eAmt * SC + start;
}

export function clearLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
}
/* export function isAuthenticated() {
    

    let item = AdminService.getAllProduct()
        .then((res) => {
           
            console.log(res.data.length);
            return res.data.length;
        })
        .catch((error) => {
            console.log(error);
        });

  
}
 */
