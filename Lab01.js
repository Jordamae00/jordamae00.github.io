function arrayWork()
  {
    var array = [];
    total = 0;
    for (var i=0; i<5; i++)
    {
      var val = Math.floor( Math.random()*100 );
      total += val
      array.push(val);
    }
    var mean = total/array.length;
    console.log(mean);
    var outArray = [];
    for (var i=0; i<=5; i++)
    {
      if (array[i]>mean)
      {
        outArray.push(array[i]);
      }
    } 
    document.querySelector("#arrayOut").innerHTML="The array is:"+array+"<br>The mean is:"+mean+"<br>Greater:"+outArray;
  }