import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/do";
import 'rxjs/add/operatod/withLatest';

import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SELECT_REDDIT
} from "../reducers/reddit";

import {Reddit} from "../providers/reddit";

@Injectable()
export class RedditEffects {

    constructor(
        private _actions$: Actions,
        private _reddit: Reddit,
        private _store: Store<any>
    ) {
        
     }



    @Effect() requestPosts$ = this._actions$
        .ofType(SELECT_REDDIT)
        .map(action => this.process(action));
        //.map( action =>  ({type: REQUEST_POSTS, payload: {reddit: action.payload}}));

        // console.log("User Selected seen in effect: " + action.payload);
        /*
        .subscribe((next) => {
            console.log("User Selected: " + next);
            return({type: REQUEST_POSTS, payload: {reddit: next}});
        });*/
        /*
        .mapfilter(({state, action}) => this.shouldFetchPosts(state.postsByReddit, action.payload))
        .map(({action}) => ({ type: REQUEST_POSTS, payload: { reddit: action.payload } }));
        */

    private process(action) {
        return {type: REQUEST_POSTS, payload: {reddit: action.payload}};
    }

    private shouldFetchPosts(postsByReddit, reddit) {
        const posts = postsByReddit[reddit];
        if (!posts) {
            return true;
        }
        if (posts.isFetching) {
            return false;
        }
        return posts.didInvalidate;
    }


}
