const checkTags = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  img: 'img',
  a: 'a'
}

// ========html text elements highlight============
let highlightStyleStr = `
  h2,
  h3,
  p,
  ul { 
    border: 2px solid red;
  }
  h2::after {
    content: "h2"
  }
  h3::after {
    content: "h3"
  }
  p::after {
    content: "p"
  }
  
  h2::after,
  h3::after,
  p::after,
  ul:after {
    color: red;
    position: absolute;
    right: -10px;
    font-size: 16px;
  }
  ul::after {
    content: "ul";
    top: 0;
  }
  p.qa-p {
    border: none;
  }
  p.qa-p::after {
    content: "";
  }
`  
let highlightStyles = document.createElement('style')
highlightStyles.type = 'text/css'
highlightStyles.className = 'qa'
highlightStyles.appendChild(document.createTextNode(highlightStyleStr))
document.getElementsByTagName("head")[0].appendChild(highlightStyles);

// ======================================================================


const articleContent = document.getElementsByClassName('article--main-content-wrapper')[0]


// ======================img info hightlight==============================
const articleImages = articleContent.getElementsByTagName('img')

const currentImg = articleImages[0]
// const PromisSize = await fetch(imgUrl).then(response => response.blob())

const img = await fetch(currentImg.currentSrc);
const blob = await img.blob();

let roundedString = (blob.size/1024).toFixed(2);
let imgSizeKb = Number(roundedString);

const imgProps = {
  imgSrc: currentImg.currentSrc,
  width: currentImg.naturalWidth,
  height: currentImg.naturalHeight,
  alt: currentImg.alt,
  imgFileSize: imgSizeKb 
}

const imgInfoBlock = document.createElement('p')
imgInfoBlock.className = 'qa-p'
imgInfoBlock.innerText = `
  alt: ${imgProps.alt}
  size: ${imgProps.imgFileSize} Kb
  natural width: ${imgProps.width} px
  natural height: ${imgProps.height} px
`

imgInfoBlock.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
`
currentImg.parentElement.append(imgInfoBlock)
// ======================================================