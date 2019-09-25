export function replaceHtmlStyle(htmlStr) {
    // body...
  
    var firstStr = htmlStr.replace(new RegExp('<img style="', 'g'),'<img style="max-width:100%;')
  
    var secondStr = firstStr.replace(new RegExp('<img src', 'g'),'<img style="max-width:100%;" src')
  
    // console.log(secondStr)
    return secondStr;
  }