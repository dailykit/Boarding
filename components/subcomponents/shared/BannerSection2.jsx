import React, { PureComponent } from "react";
import Image from "next/image";
export default class BannerSection2 extends PureComponent {
  render() {
    return (
      <div style={{backgroundColor: this.props?.backgroundColor, marginTop:"5rem"}}>
      <div className="container nunito" >
        <div className="row justify-content-center text-center" style={{"flexDirection":this.props.imageFirst && "column-reverse"}}>
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
            {this.props.heading && <h2 className={this.props.headingSize?"headingSize":"headingSize2"} style={{color:this.props.backgroundColor=="#fff"?"#111B2B":"#fff",display:"inline",fontWeight:"bold"}}>{this.props.heading}</h2>}
            {this.props.highlight && <h2 className="highlightSize" style={{color:this.props.backgroundColor=="#fff"?"#111B2B":"#FCDE67",display:"inline",fontWeight:"bold"}}>{this.props.highlight}</h2>}
            {this.props.heading2 && <h2 className="headingSize" style={{color:this.props.backgroundColor=="#fff"?"#111B2B":"#fff",marginBottom:"15px",display:"inline",fontWeight:"bold"}}>{this.props.heading2}</h2>}
            </div>
            {this.props.description && (
              <div className="descriptiontype1 descriptionSize">{this.props.description}</div>
            )}{" "}
            {this.props.descriptiontype2 && (
              <div className="descriptiontype2 nunito descriptionSize">
                {this.props.descriptiontype2}
              </div>
            )}{" "}
            {this.props.descriptionpoints && (
              <ul className="onDemandCategories descriptionSize ml-15px">
                {this.props.descriptionpoints.map((point) => {
                  return <li className="descriptionSize" key={point}>{point}</li>;
                })}
              </ul>
            )}
            <div className="row">
              <div className="col-md-6 col-xs-10">
              {this.props.descriptionpoints1 && (
              <ul className="onDemandCategories descriptionSize ml-15px">
                {this.props.descriptionpoints1.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
            )}
            </div><div className="col-md-6 col-xs-10">
              {this.props.descriptionpoints2 && (
              <ul className="onDemandCategories descriptionSize">
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
        
        </div>
      </div>
      </div>);
  }
}
