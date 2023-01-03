export const _validatePin = (codes = [], pinL = 4) => {
    if (codes.length != pinL) {
        return alert("code not valid")
    }

    for (let index = 0; index < codes.length; index++) {
        const element = parseInt(codes[index]);
        if (isNaN(element)) {
            return alert("code not valid")
        }
    }
    document.getElementById("form").submit()
}