// const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);

let optionArr = [];
let filesArr=[];

for(let i=0;  i<inputArr.length; i++)
{
    if(inputArr[i].charAt(0)=='-')
    {
        optionArr.push(inputArr[i]); 
    }

    else
    {
        filesArr.push(inputArr[i]); 
    }
}


for(let i=0; i<filesArr.length;i++)
{
    if(fs.existsSync(filesArr[i])==false)
    {
        console.log("The File does not Exist");
        return;
    }
}

let bothPresent = optionArr.includes("-b") && optionArr.includes("-n");
if (bothPresent) 
{
   let bIndex = optionArr.indexOf("-b");
   let nIndex = optionArr.indexOf("-n");
   if(bIndex>nIndex)//-n comes first and will be executed.
   {
       delete optionArr[bIndex];
   }
   else
   {
       delete optionArr[nIndex];
   }
}

let content="";
for(let i=0; i<filesArr.length;i++)
{
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
}
// console.log(content);

let contentAr = content.split("\r\n");

//-s
let isSPresent = optionArr.includes("-s");
if(isSPresent)
{
    for(let i =1; i<contentAr.length; i++)
    {
        if(contentAr[i]=='' && contentAr[i-1]=='')
        {
            contentAr[i]=null;
        }
        else if(contentAr[i]=='' && contentAr[i-1]==null)
        {
            contentAr[i]=null; 
        }
    }

    let tempAr = []; //to store elements without spaces
    for(let i=0; i<contentAr.length;i++)
    {
        if(contentAr[i]!=null)
        {
            tempAr.push(contentAr[i]);
        }
    }
    contentAr = tempAr;

}
// console.log(contentAr.join("\n")); 

// console.log(optionArr);
// console.log(filesArr);
// console.log(contentAr);

//-n
let isNPresent = optionArr.includes("-n");
if (isNPresent) 
{
    let count=1;
    for (let i = 0; i < contentAr.length; i++) {
        contentAr[i] =  count+" "+contentAr[i];
        count++;
    }
}

//-b
let isBpresent = optionArr.includes("-b");
if(isBpresent)
{
    let count=1;  

    for(let i = 0; i<contentAr.length; i++)
    {
        if(contentAr[i]!='')
        {
            contentAr[i] = count+" "+ contentAr[i];
            count++;
        }
    }
}

console.log(contentAr.join("\n")); 
