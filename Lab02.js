var hours12=true;

function getInfo ()
{
  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var date = new Date;
  year = date.getFullYear();
  month = months[date.getMonth()];
  day = date.getDate();
  minutes = date.getMinutes();
  hours12 = ( document.getElementById("Hours").selectedIndex==0 ? true : false );
  hour = date.getHours();
  hour = (hours12 ? hour%12 : hour);
  return [year,month,day,hour,minutes];
}

  function dateAlert() {
    let dayValues = getInfo();
    alert("The date today is: "+dayValues[1]+" "+dayValues[2]+", "+dayValues[0]);
    alert("and the current time is: "+dayValues[3]+":"+dayValues[4]);
  }

  function datePage() {
    let dayValues = getInfo();
    document.querySelector("#dateOut").innerHTML=
         "The date today is: "+dayValues[1]+" "+dayValues[2]+", "+dayValues[0]+"<br>"+
         "and the current time is: "+dayValues[3]+":"+dayValues[4];
  }