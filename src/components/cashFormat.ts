export const cashFormat = (x: any, numb?: any) => {
  if(x){ 
    let number = x.toString().replace(",","")
    if(numb){
      number = parseFloat(number) * numb
    }
    return "$"+parseFloat(number).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 
  return "$0"
};