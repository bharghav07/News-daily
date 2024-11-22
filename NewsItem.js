import React from 'react'

const NewsItem =(props)=> {
    let {title,description,imageUrl,newsUrl,author,date,source}=props;
    return (
      <div>
       <div className="card">
       <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'50%',zIndex:1}}>
       {source}</span>
        <img src={imageUrl?imageUrl:"https://www.reuters.com/resizer/v2/FLAJCE5JFJMJ5DZ34X4PGSDAXY.jpg?auth=be07b8a605bb2e67ec09758444eec4551c0860dee8b453992645ea375f320afa&height=1005&width=1920&quality=80&smart=true"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem
