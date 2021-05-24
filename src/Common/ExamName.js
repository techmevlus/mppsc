import React from 'react';

class ExamName extends React.PureComponent{

    constructor(props, context){
        super(props, context);
        this.state = {
            exams:[]
        }
        this.loadExamNameFromServer = this.loadExamNameFromServer.bind(this);
    }

    loadExamNameFromServer(){
        fetch(this.props.url)
        .then(res => res.json())
        .then(exams =>{
            this.setState({ exams })
        })
    }

    componentWillMount(){
        this.loadExamNameFromServer();
    }
	
	render () { 
        if(this.state.exams === "" || this.state.exams === undefined || this.state.exams === null){
            console.log("Data fetch failed")
        }else{
            console.log("Data fetch succeeded")
        }
        return 	 <div> 
                      <main id="main">
                      <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                        <ol>
                          <li><a href="index.html">Home</a></li>
                          <li>TEST</li>
                        </ol>
                        <h2>AVAILABLE TEST</h2>
                         </div>
                      </section>

                      <section id="portfolio" className="portfolio">
      <div className="container">

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" className="filter-active">All</li>
              {this.state.exams.map(item =>
              (<li data-filter={"."+item.exam_name}>{item.exam_name}</li>)
              )}
            </ul>
          </div>
        </div>

        <div className="row portfolio-container">

            {this.state.exams.map(item =>(
                <div className={"col-lg-4 col-md-6 portfolio-item "+item.exam_name}>
                    <div className="portfolio-wrap">
                    <img src="assets/img/portfolio/portfolio-1.jpg" className="img-fluid" alt=""></img>
                    <div className="portfolio-info">
                        <h4>App 1</h4>
                        <p>{item.exam_name}</p>
                        <div className="portfolio-links">
                        <a href="assets/img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 1"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                        </div>
                    </div>
                    </div>
                </div>
            ))}


          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-4.jpg" className="img-fluid" alt=""></img>
              <div className="portfolio-info">
                <h4>Card 2</h4>
                <p>Card</p>
                <div className="portfolio-links">
                  <a href="assets/img/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 2"><i className="bx bx-plus"></i></a>
                  <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-5.jpg" className="img-fluid" alt=""></img>
              <div className="portfolio-info">
                <h4>Web 2</h4>
                <p>Web</p>
                <div className="portfolio-links">
                  <a href="assets/img/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 2"><i className="bx bx-plus"></i></a>
                  <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-6.jpg" className="img-fluid" alt=""></img>
              <div className="portfolio-info">
                <h4>App 3</h4>
                <p>App</p>
                <div className="portfolio-links">
                  <a href="assets/img/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 3"><i className="bx bx-plus"></i></a>
                  <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-7.jpg" className="img-fluid" alt=""></img>
              <div className="portfolio-info">
                <h4>Card 1</h4>
                <p>Card</p>
                <div className="portfolio-links">
                  <a href="assets/img/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 1"><i className="bx bx-plus"></i></a>
                  <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-8.jpg" className="img-fluid" alt=""></img>
              <div className="portfolio-info">
                <h4>Card 3</h4>
                <p>Card</p>
                <div className="portfolio-links">
                  <a href="assets/img/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 3"><i className="bx bx-plus"></i></a>
                  <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-9.jpg" className="img-fluid" alt=""></img>
              <div className="portfolio-info">
                <h4>Web 3</h4>
                <p>Web</p>
                <div className="portfolio-links">
                  <a href="assets/img/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 3"><i className="bx bx-plus"></i></a>
                  <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
                      </main>
	            </div>; 
	}
}
export default ExamName;