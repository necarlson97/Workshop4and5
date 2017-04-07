import React from 'react';
import { unixTimeToString } from '../util.js'
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  /**
  * Triggered when the user clicks on the 'like' or 'unlike' button.
  */
  handleLikeClick(clickEvent) {

    clickEvent.preventDefault();

    if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter});
      };

      if (this.didUserLike()) {
        // User clicked 'unlike' button.
        unlikeComment(this.props.feedItemId, this.props.index, 4, callbackFunction);
      } else {
        // User clicked 'like' button.
        likeComment(this.props.feedItemId, this.props.index, 4, callbackFunction);
      }
    }
  }


  /**
  * Returns 'true' if the user liked the item.
  * Returns 'false' if the user has not liked the item.
  */
  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;

    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i] == 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }



  render() {
    var likeButtonText = "Like";
    if (this.didUserLike()) {
      likeButtonText = "Unlike";
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-12">
              <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link>
                <div> {this.props.children} </div>
              </div>
            </div>
            <a href="#" onClick={(e) => this.handleLikeClick(e)}>
              {this.state.likeCounter.length} <span className="glyphicon glyphicon-thumbs-up"></span> {likeButtonText}
              </a> · <a href="#">Reply</a> ·
              {unixTimeToString(this.props.postDate)}
            </div>
          </div>
        )
      }
    }
