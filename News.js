import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News=(props)=> {
  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(false)
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)
  const cap=(s)=>{
    return s.charAt(0).toUpperCase()+s.slice(1);
  }
    
  const updateNews=async()=>{
    props.setProgress(0);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d37b692a93bf4815968e5e5137ac9a5d&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    let data=await fetch(url);
    props.setProgress(30);
    let parsedData=await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
     document.title=`${cap(props.category)}- NewsToday`;
    updateNews();
    //eslint-disable-next-line
  },[])

  const handlePrev=async ()=>{
    setPage(page-1);
    updateNews();
  }
  const handleNext=async ()=>{
    setPage(page+1);
    updateNews();
  }
    return (
      <div className='container'>
      <h1 className="text-center" style={{margin:'30px 0px',marginTop:'90px'}}>NewsToday-Top {cap(props.category)} headlines</h1>
      {loading && <Spinner/>}
      <div className="row">
      {!loading && articles.map((element)=>{
        return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
      </div>
        <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrev}>&larr; Previous</button>
        <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
}
News.defaultProps={
  country: 'us',
  pageSize: 8,
  category:'general'
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News
