import React from 'react';
import { Card,CardImgOverlay,CardImg,CardText,CardBody,CardTitle,Breadcrumb, BreadcrumbItem, Media} from 'reactstrap';
import {Link} from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';

function RenderDish({dish}){
    if (dish != null)
    {
        return(
          <FadeTransform in transformProps = {{exitTransform:'scale(0.5) translateY(-50%)'}}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
            </Card>
            </FadeTransform>
        );
    }
}

function RenderComments({comments,postComment,dishId}) {
  if (comments == null || comments.length === 0) {
    return (
      <div></div>
    );
  }

    // if (comments!=null) {
    //   return (
    //     <div  className="col-12 col-md-5 m-1">
    //       <h4>Comments</h4>
    //       <ul className="list-unstyled">
    //         {comments.map((comment) => {
    //           return (
    //             <li key={comment.id}>
    //               <p>{comment.comment}</p>
    //               <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
    //             </li>
    //           );
    //           })}
    //       </ul>
    //     </div>
    //   );
    // }

    const renderedComments = comments.map((comment) => {
      return (
        <Fade in>
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
        </li>
        </Fade>
      );
    });
    return (
      <>
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
          { renderedComments }
          </Stagger>
        </ul>
        {/* <ul>
          <CommentForm dishId={dishId} addComment={addComment}  />
        </ul> */}
      </div>
      <CommentForm dishId={dishId} postComment={postComment}  />
      </>
    );
  }
  const DishDetail = (props) => {
    if(props.isloading){
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );

    }
    else if (props.errMess){
      return(
        <div className="container">
          <div className="row">
      <h4>{props.errMess}</h4>
          </div>
        </div>
      );

    }
    else if (props.dish != null) {
      return (
        <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            <div className="col-12 col-md-6">
                <RenderDish dish={props.dish} /> 
                </div> 
              <div className="col-12 col-md-6">   
                <RenderComments comments={props.comments}
                dishId={props.dish.id}
                postComment = {props.postComment} />
              </div>
        </div>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

export default DishDetail;