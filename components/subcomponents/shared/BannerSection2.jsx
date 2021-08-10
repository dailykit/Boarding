import React, { PureComponent } from "react";
import Image from "next/image";
export default class BannerSection2 extends PureComponent {
  render() {
    return (
      <div style={{backgroundColor: this.props?.backgroundColor, marginTop:"5rem"}}>
      <div className="container nunito" >
        <div className="row justify-content-center text-center">
          {this.props.leftimageurl && (
            <div className="col-md-6 col-xs-10 leftimage1" style={{"marginTop":"100px"}}>
              <Image
                width="494px"
                height="546px"
                src={this.props.leftimageurl}
                alt="women-cooking"
              />
            </div>
          )}
          <div className="col-md-6 col-xs-10  trend-responsive banner-section1-description" style={{"marginTop":"100px"}}>
            <div style={{"marginBottom":"40px",fontWeight:"bold", marginTop:this.props.heading2 && "60px"}} className="nunito">
            {this.props.heading && <h2 style={{color:this.props.backgroundColor=="#fff"?"#111B2B":"#fff",fontSize:this.props.headingSize,display:"inline",fontWeight:"bold"}}>{this.props.heading}</h2>}
            {this.props.highlight && <h2 style={{color:this.props.backgroundColor=="#fff"?"#111B2B":"#FCDE67",fontSize:this.props.highlightSize,display:"inline",fontWeight:"bold"}}>{this.props.highlight}</h2>}
            {this.props.heading2 && <h2 style={{color:this.props.backgroundColor=="#fff"?"#111B2B":"#fff",fontSize:this.props.headingSize,marginBottom:"15px",display:"inline",fontWeight:"bold"}}>{this.props.heading2}</h2>}
            </div>
            {this.props.description && (
              <div className="descriptiontype1" style={{fontSize:this.props?.descriptionSize}}>{this.props.description}</div>
            )}{" "}
            {this.props.descriptiontype2 && (
              <div className="descriptiontype2 nunito">
                {this.props.descriptiontype2}
              </div>
            )}{" "}
            {this.props.descriptionpoints && (
              <ul className="onDemandCategories" style={{fontSize:this.props?.descriptionSize,marginLeft:"-15px"}}>
                {this.props.descriptionpoints.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
            )}
            <div className="row">
              <div className="col-md-6 col-xs-10">
              {this.props.descriptionpoints1 && (
              <ul className="onDemandCategories" style={{fontSize:this.props?.descriptionSize,marginLeft:"-15px"}}>
                {this.props.descriptionpoints1.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
            )}
            </div><div className="col-md-6 col-xs-10">
              {this.props.descriptionpoints2 && (
              <ul className="onDemandCategories" style={{fontSize:this.props?.descriptionSize}}>
                {this.props.descriptionpoints2.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
            )}
            </div> </div>
            {this.props.buttonlink && (
              <a href={this.props.buttonlink}>
                {this.props.greenbuttontext && (
                  <button type="button" className="btn-style-thirteen green mt-4">
                    {this.props.greenbuttontext}
                  </button>
                )}
                {this.props.blackbuttontext && (
                  <button type="button" className="btn-style-thirteen black mt-4">
                    {this.props.blackbuttontext}
                  </button>
                )}
                {this.props.whitebuttontext && (
                  <button type="button" className="btn-style-fourteen mt-4">
                    {this.props.whitebuttontext}
                  </button>
                )}
              </a>
            )}
          </div>
          {this.props.rightimageurl && (
            <div className="col-md-6 col-xs-10 leftimage1" style={{"marginTop":"100px"}}>
              <Image
                width={this.props.width ? this.props.width : "424px"}
                height={this.props.height ? this.props.height : "546px"}
                src={this.props.rightimageurl}
                alt="right-picture"
              />
            </div>
          )}
          {/* {this.props.rightimagecarousel && (
            <div className="col-md-5 col-xs-10 mt-4 mt-4">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <Image
                      height="640px"
                      width="640px"
                      src={this.props.rightimagecarousel[0]}
                      className="d-block w-80"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <Image
                      height="640px"
                      width="640px"
                      src={this.props.rightimagecarousel[1]}
                      className="d-block w-80"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <Image
                      height="640px"
                      width="640px"
                      src={this.props.rightimagecarousel[2]}
                      className="d-block w-80"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
      </div>);
  }
}
