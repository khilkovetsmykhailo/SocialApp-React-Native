import { SET_POSTS, CREATE_POST, DELETE_POST, UPDATE_POST, LIKE_POST, UNLIKE_POST, COMMENT_POST, UNCOMMENT_POST } from "../actions/posts";

const initialState = {
    allPosts: [],
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_POSTS:
            return {
                ...state,
                allPosts: action.posts
            }

        case CREATE_POST:
            return{
                ...state,
                allPosts: [action.postData, ...state.allPosts]
            }

        case UPDATE_POST:
            const postIndex = state.allPosts.findIndex(post => post._id === action.updatedPostData._id);
            const updatedAllPosts = [...state.allPosts];
            updatedAllPosts[postIndex] = action.updatedPostData;
            return {
                ...state,
                allPosts: updatedAllPosts
            }

        case DELETE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post._id !== action.pid)
            }

        case LIKE_POST:
            const pIndex = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedLikePosts = [...state.allPosts];
            updatedLikePosts[pIndex].likes = updatedLikePosts[pIndex].likes.concat(action.userId);
            console.log(updatedLikePosts[pIndex].likes);
            return{
                ...state,
                allPosts: updatedLikePosts
            }

        case UNLIKE_POST:
            const pInd = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedUnlikePosts = [...state.allPosts];
            updatedUnlikePosts[pInd].likes = updatedUnlikePosts[pInd].likes.filter(x => x !== action.userId);
            console.log(updatedUnlikePosts[pInd].likes);
            return{
                ...state,
                allPosts: updatedUnlikePosts
            }

        case COMMENT_POST:
            const index = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedCommentPosts = [...state.allPosts];
            updatedCommentPosts[index].comments = action.comments;
            console.log(updatedCommentPosts[index].comments);
            return{
                ...state,
                allPosts: updatedCommentPosts
            }

        case UNCOMMENT_POST:
            const indx = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedUncommentPosts = [...state.allPosts];
            updatedUncommentPosts[indx].comments = updatedUncommentPosts[indx].comments.filter(c => c._id !== action.commentId)

            return{
                ...state,
                allPosts: updatedUncommentPosts
            }

        default:
            return state;
    }
}