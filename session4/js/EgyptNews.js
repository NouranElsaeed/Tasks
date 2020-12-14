


const link ="http://newsapi.org/v2/top-headlines?country=eg&apiKey=b9fd09d294284c58b9c3ec0826e4ed85" ;

fetch(link).then(response=>{
return  response.json()
}).then(data=>{
    getData(data)
}).catch(e=>{
    console.log('error')
})
const getData=(data)=>{


var articles= data.articles
for(i=0 ;i<articles.length ; i++){

var title=data.articles[i].title
var author=data.articles[i].author

var description=data.articles[i].description
var urlToImage=data.articles[i].urlToImage

var view = document.getElementById('view')
var image = document.createElement('img')
var div = document.createElement('div')
var h5 = document.createElement('h5')
var a = document.createElement('a')
var p2 = document.createElement('p')
var text1 = document.createTextNode(title)
var text2 = document.createTextNode(author)
var text3 = document.createTextNode(description)
image.src=urlToImage
a.href=author
image.classList=['card-img-top' , '']
div.classList='card-body';
h5.classList='card-title';
p2.classList='card-text';



h5.appendChild(text1)
a.appendChild(text2)
p2.appendChild(text3)
view.appendChild(image);
view.appendChild(div)
div.appendChild(h5 )
div.appendChild(a)
div.appendChild(p2)







    //console.log(urlToImage)
}




//console.log(data)

}