  // ========html text elements highlight============
  let highlightStyleStr = `
    .layout-content h1,
    .layout-content h2,
    .layout-content h3,
    .layout-content p,
    .layout-content ul { 
      border: 2px solid #007bff;
    }
    .layout-content h1::after {
      content: "h1"
    }
    .layout-content h2::after {
      content: "h2"
    }
    .layout-content h3::after {
      content: "h3"
    }
    .layout-content p::after {
      content: "p"
    }
    .layout-content h1::after,
    .layout-content h2::after,
    .layout-content h3::after,
    .layout-content p::after,
    .layout-content ul:after {
      color: #4fe710f7;
      /*position: absolute;*/
      /*right: 25px;*/
      padding-left: 10px;
      font-size: 16px;
      font-weight: 600;
      /*background-color: yellow;*/
    }
    .layout-content ul::after {
      content: "ul";
      top: 0;
    }
    .layout-content p.qa-p {
      border: none;
      position: absolute;
        top: 0;
        left: 0;
        color: rgb(255, 255, 255);
        background-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        /*display: flex;
        justify-content: center;
        align-items: center;*/
        text-align: right;
        font-size: 14px;
        /*font-weight: 600;*/
        letter-spacing: 1px;
    }
    .layout-content p.qa-p::after {
      content: "";
    }

    .layout-content a {
        border: 2px solid #b11bc3;
        color: #b11bc3;    
    }
    #topInfoBlock {
        display: flex;
        justify-content: space-around;
    }
    #taxonomyInfo,
    #metaInfo {
        border: 3px solid green;
    }
    #metaInfo {
        width: 80%;
    }
    #taxonomyInfo h2,
    #metaInfo h2 {
        color: #b11bc3;
        font-weight: 600;
        font-size: 22px;
    }
  `  
  let highlightStyles = document.createElement('style')
  highlightStyles.type = 'text/css'
  highlightStyles.className = 'qa'
  highlightStyles.appendChild(document.createTextNode(highlightStyleStr))
  document.getElementsByTagName("head")[0].appendChild(highlightStyles);
  // ======================================================================
  

  //   ==============taxonomy script===========================
  let arrayScripts = document.querySelectorAll("script");
  let fireTags = '';
  arrayScripts.forEach(element => {
      if (element.getAttribute('type') == "application/json") {
              fireTags = element;
      }
  });

  let jsonFile, taxonomyTags, taxonomyStr
  jsonFile = JSON.parse(fireTags.textContent);
  if (!jsonFile.nppe_ttt_datalayer) {
    taxonomyTags = ""
    taxonomyStr = "undefined"
  } else {
      taxonomyTags = jsonFile.nppe_ttt_datalayer.init.firetags.entityTaxonomy;
      taxonomyStr = JSON.stringify(taxonomyTags, null, 6);
  }
  //   ============================================================


  // ====================top block====================
  const body = document.querySelector('body')
  const topInfoBlock = document.createElement('div')
  topInfoBlock.id = 'topInfoBlock'
  topInfoBlock.style.padding = '10px'

  //taxonomy block
  const taxonomyDiv = document.createElement('div')
  taxonomyDiv.id = 'taxonomyInfo'
  taxonomyDiv.innerHTML = `<h2>Taxonomy Info</h2>`
  const taxP = document.createElement('p')
  taxP.innerText = taxonomyStr
  taxonomyDiv.appendChild(taxP)

  //meta block  
  const metaDiv = document.createElement('div')
  metaDiv.id = 'metaInfo'
  metaDiv.innerHTML = `<h2>Meta Info</h2>`
  const metaP = document.createElement('p')

  const pageTitle = document.querySelector('title') || "title - undefined"
  const metaDescription = document.querySelector('meta[name=description]') || "meta description - undefined"
  const metaOgTitle = document.querySelector("meta[property='og:title']") || "meta og:title - undefined"
  const metaOgDescription = document.querySelector("meta[property='og:description']") || "meta og:description - undefined"


  metaP.innerText = `
    ${pageTitle.outerHTML || pageTitle}
    ${metaDescription.outerHTML || metaOgDescription}
    ${metaOgTitle.outerHTML || metaOgTitle}
    ${metaOgDescription.outerHTML || metaOgDescription}
    
    
  ` 
  metaDiv.appendChild(metaP)

  topInfoBlock.appendChild(taxonomyDiv)
  topInfoBlock.appendChild(metaDiv)

  body.insertBefore(topInfoBlock, body.firstChild)
  // =================================================



  const mainContainer = document.querySelector('.layout-content')
  
  
  // ======================img info hightlight==============================
  //   const articleImages = articleContent.getElementsByTagName('img')
  const articleImages = mainContainer.querySelectorAll('img')
  articleImages.forEach(async function (currentImg)  {
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
    currentImg.parentElement.append(imgInfoBlock)
   
  });  
  // ======================================================

  // =======================links======================
  const linkInfoBlock = document.createElement('div')
  linkInfoBlock.id = 'linkInfoBlock'
  linkInfoBlock.style.cssText = "position: fixed; top: 50%; left:10%; border: 5px solid orange; background-color: #fff; display: none; z-index: 1000; padding: 10px;"
  document.querySelector('body').appendChild(linkInfoBlock)
  const links = document.querySelectorAll('.layout-content a')
  links.forEach(link => {
      link.addEventListener("mouseover", e => {
          linkInfoBlock.innerText = e.target.outerHTML
          linkInfoBlock.style.display = 'block'
      })
      link.addEventListener("mouseout", e => {
        linkInfoBlock.innerText = ""
        linkInfoBlock.style.display = 'none'    
    })
  })
  // ==================================================


